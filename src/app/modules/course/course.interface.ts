import { Types } from 'mongoose';

type TPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export interface ICourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourse];
}

export type TCourseFaculties = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
