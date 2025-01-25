import { Schema as _Schema, model, mongoose } from "mongoose";
const Schema = _Schema;

const linkSchema = new Schema({
  type: String,
  url: String,
});

const projectSchema = new Schema({
  title: String,
  description: String,
  technologies: [String],
  links: [linkSchema],
});
const StudentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Locked fields with verification
    personalInfo: {
      isLocked: { type: Boolean, default: false },
      name: {
        type: String,
        required: true,
      },
      rollNumber: {
        type: Number,
        required: true,
        unique: true,
      },
      department: {
        type: String,
        required: true,
      },
      batch: {
        type: Number,
        required: true,
      },
    },

    academics: {
      isLocked: { type: Boolean, default: false },
      cgpa: {
        type: Number,
        required: true,
      },
      tenthMarks: {
        type: Number,
        required: true,
      },
      twelfthMarks: {
        type: Number,
        required: true,
      },
    },
    secondaryEmail: {
      type: String,
    },
    // Unlocked fields
    skills: [String],
    education: [
      {
        institution: String,
        degree: String,
        year: Number,
        score: String,
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    projects: [projectSchema],

    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],

    academicResults: {
      type: Schema.Types.ObjectId,
      ref: "AcademicResult",
    },

    socialLinks: {
      github: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
    },
    // Verification metadata
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    verificationDate: Date,

    // Track modifications
    modificationHistory: [
      {
        field: String,
        oldValue: Schema.Types.Mixed,
        newValue: Schema.Types.Mixed,
        modifiedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        modifiedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

//middleware to prevent modification of locked fields
StudentSchema.pre("save", function (next) {
  // Check if personal info is locked and modified
  if (this.personalInfo?.isLocked && this.isModified("personalInfo")) {
    const error = new Error("Cannot modify locked personal information");
    error.statusCode = 403;
    return next(error);
  }

  // Check if academics is locked and modified
  if (this.academics?.isLocked && this.isModified("academics")) {
    const error = new Error("Cannot modify locked academic information");
    error.statusCode = 403;
    return next(error);
  }

  // Check semester results locks
  const modifiedSemesters = this.modifiedPaths().filter((path) =>
    path.startsWith("semesterResults")
  );

  for (const path of modifiedSemesters) {
    const semesterIndex = path.split(".")[1];
    if (this.semesterResults[semesterIndex]?.isLocked) {
      return next(
        new Error(`Cannot modify locked semester ${semesterIndex + 1} results`)
      );
    }
  }
  next();
});

const Student = model("Student", StudentSchema);

export default Student;
