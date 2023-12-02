import { Document, Query, Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    age: Number,
    dateOfBirth: Date,
    email: {
      type: String,
      unique: true,
    },
    contactNo: String,
    emergencyContactNo: String,
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: String,
    permanentAddress: String,
    guardian: {
      fatherName: String,
      fatherOccupation: String,
      fatherContactNo: String,
      motherName: String,
      motherOccupation: String,
      motherContactNo: String,
    },
    localGuardian: {
      name: String,
      occupation: String,
      contactNo: String,
      address: String,
    },
    profileImg: String,
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre(/^find/, function (this: Query<IStudent, Document>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Student = model<IStudent>('Student', studentSchema);
