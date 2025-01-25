import { Schema as _Schema, model, mongoose } from "mongoose";
const Schema = _Schema;
const backlogSchema = Schema({
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "cleared"],
    default: "pending",
  },
  clearedIn: {
    semester: Number,
    attemptNumber: Number,
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending",
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  verifiedAt: Date,
});

const semesterResultSchema = new Schema(
  {
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    sgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    backlogs: [backlogSchema],
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: Date,
  },
  { _id: false }
); // Disable _id for subdocuments
const academicResultSchema = Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    semesters: [semesterResultSchema],
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AcademicResult = model("AcademicResult", academicResultSchema);
export default AcademicResult;
