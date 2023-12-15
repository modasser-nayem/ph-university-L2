import mongoose, { Schema, model } from 'mongoose';
import { ICourse, TCourseFaculties } from './course.interface';

const preRequisiteCourse = new Schema(
  {
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    prefix: {
      type: String,
      required: [true, 'Prefix is required'],
    },
    code: {
      type: Number,
      unique: true,
      required: [true, 'Prefix is required'],
    },
    credits: {
      type: Number,
      required: [true, 'Credits is required'],
    },
    preRequisiteCourses: [preRequisiteCourse],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Course = model<ICourse>('Course', courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculties = model<TCourseFaculties>(
  'CourseFaculty',
  courseFacultiesSchema,
);
