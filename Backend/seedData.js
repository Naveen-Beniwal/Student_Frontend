import mongoose from "mongoose";
import dotenv from "dotenv";
import JNF from "./src/schema/company/jnfSchema.js";
import Job from "./src/schema/company/jobSchema.js";
import Application from "./src/schema/general/applicationSchema.js";

dotenv.config();

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(
      "mongodb+srv://admin:5nGy0DXhrTvmNoBt@tnpprojectstudent.baeal.mongodb.net/?retryWrites=true&w=majority&appName=TNPProjectStudent"
    );
    console.log("Connected to MongoDB");

    // Create JNF
    const jnfData = {
      companyDetails: {
        name: "Tech Corp",
        email: "hr@techcorp.com",
        website: "www.techcorp.com",
        companyType: "MNC",
        domain: "IT",
        description: "Leading tech company",
      },
      jobProfiles: [
        {
          course: "B.Tech",
          designation: "Software Engineer",
          ctc: 1500000,
          takeHome: 1200000,
          placeOfPosting: "Bangalore",
        },
      ],
      eligibleBranches: {
        btech: [
          {
            name: "Computer Engineering",
            eligible: true,
          },
        ],
      },
      status: "approved",
      submittedBy: "6772e4b13dc072745d3c1bdb", // recruiter ID
      reviewedBy: "6772e4b13dc072745d3c1bdb", // admin ID
      submissionDate: new Date(),
      reviewDate: new Date(),
    };

    console.log("Creating JNF...");
    const jnf = await JNF.create(jnfData);
    console.log("JNF created with ID:", jnf._id);

    // Create Job
    const jobData = {
      title: "Software Engineer",
      company: "Tech Corp",
      description: "Entry level SDE role",
      requirements: ["DSA", "Web Development"],
      eligibility: {
        departments: ["CSE", "IT"],
        minCGPA: 7.0,
        batch: 2024,
      },
      salary: {
        ctc: 1500000,
        breakup: "Base: 12L, Variable: 3L",
      },
      rounds: [
        {
          name: "Technical Round",
          description: "DSA and CS Fundamentals",
          date: new Date("2024-01-15"),
          venue: "Online",
        },
      ],
      numberOfPositions: 10,
      status: "open",
      createdBy: "6772e4b13dc072745d3c1bdb",
      applicationDeadline: new Date("2024-01-10"),
      jnf: jnf._id,
    };

    console.log("Creating Job...");
    const job = await Job.create(jobData);
    console.log("Job created with ID:", job._id);

    // Create Application
    const applicationData = {
      student: "6772e6221d84c9e5841da51f",
      job: job._id,
      status: "applied",
      roundStatus: [
        {
          round: "Technical Round",
          status: "pending",
          feedback: "",
          date: new Date(),
        },
      ],
      timeline: [
        {
          status: "applied",
          date: new Date(),
          remarks: "Application submitted",
        },
      ],
      documents: [
        {
          documentType: "Resume",
          url: "https://example.com/resume.pdf",
          verified: false,
        },
      ],
    };

    console.log("Creating Application...");
    const application = await Application.create(applicationData);
    console.log("Application created with ID:", application._id);

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
