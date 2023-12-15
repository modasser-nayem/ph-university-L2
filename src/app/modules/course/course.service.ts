import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { courseSearchableFields } from './course.constant';
import { ICourse, TCourseFaculties } from './course.interface';
import { Course, CourseFaculties } from './course.model';

const createCourseIntoDB = async (payload: ICourse) => {
  if (await Course.findOne({ code: payload.code })) {
    throw new AppError(400, 'Course code already exists');
  }
  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courses = new QueryBuilder(
    Course.find().populate({
      path: 'preRequisiteCourses.course',
      select: 'title prefix code credits',
    }),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courses.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await Course.findById(courseId);

  if (!result) {
    throw new AppError(404, 'Course not found!');
  }

  return result;
};

const updateCourseIntoDB = async (
  courseId: string,
  payload: Partial<ICourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // update primitive data
    const updateRemainingData = await Course.findByIdAndUpdate(
      courseId,
      remainingCourseData,
      { new: true, runValidators: true, session },
    );
    if (!updateRemainingData) {
      throw new AppError(400, 'Failed to update course');
    }

    let addPreRequisiteCorses;
    let removePreRequisiteCorses;
    if (preRequisiteCourses?.length) {
      // select which add
      const selectAddPreRequisiteCourses = preRequisiteCourses.filter(
        (course) => course.isDeleted === false,
      );

      // select which remove
      const selectRemovePreRequisiteCourses = preRequisiteCourses
        .filter((course) => course.isDeleted === true)
        .map((ele) => ele.course);

      // add
      addPreRequisiteCorses = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: {
            preRequisiteCourses: { $each: selectAddPreRequisiteCourses },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!addPreRequisiteCorses) {
        throw new AppError(400, 'Failed to update course');
      }

      // remove
      removePreRequisiteCorses = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: selectRemovePreRequisiteCourses },
            },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!removePreRequisiteCorses) {
        throw new AppError(400, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return (
      removePreRequisiteCorses || addPreRequisiteCorses || updateRemainingData
    );
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (courseId: string) => {
  const result = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { isDeleted: true },
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(404, 'Course not found!');
  }

  return result;
};

const assignCourseFacultiesIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculties>,
) => {
  const existCourse = await Course.findById(courseId);

  if (!existCourse) {
    throw new AppError(404, 'Course not found!');
  }

  const result = await CourseFaculties.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    { new: true, upsert: true },
  );

  return result;
};

const removeCourseFacultiesFromDB = async (
  courseId: string,
  payload: Partial<TCourseFaculties>,
) => {
  const existCourse = await Course.findById(courseId);

  if (!existCourse) {
    throw new AppError(404, 'Course not found!');
  }

  const result = await CourseFaculties.findByIdAndUpdate(
    courseId,
    {
      $pull: { faculties: { $in: payload.faculties } },
    },
    { new: true },
  );

  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignCourseFacultiesIntoDB,
  removeCourseFacultiesFromDB,
};
