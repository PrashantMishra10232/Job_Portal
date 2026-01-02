import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Interview } from "../models/Interview.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

const getAllApplications = asyncHandler(async (req, res) => {
  const recruiterId = req.user.id;

  const jobs = await Job.find({ createdBy: recruiterId });
  const jobId = jobs.map((jobs) => jobs._id);

  const page = 1;
  const limit = 10;

  const allApplications = await Application.find({ job: { $in: jobId } })
    .populate({
      path: "applicant",
    })
    .populate({
      path: "job",
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  // When you fetch documents from MongoDB using Mongoose, by default, Mongoose wraps each result in a Mongoose document. This gives you access to special methods like .save(), .populate(), .validate(), etc.
  // But if you just want to read the data and don't need these methods, you can call .lean() to get plain JavaScript objects instead of Mongoose documents.

  if (!allApplications) {
    throw new ApiError(404, "No Interviews are scheduled");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allApplications, "Here is your all applications")
    );
});

const getApprovedApplications = asyncHandler(async (req, res) => {
  console.log("getApprovedApplications called"); // Debug log
  const recruiterId = req.user.id;

  const jobs = await Job.find({ createdBy: recruiterId });
  const jobId = jobs.map((jobs) => jobs._id);

  const approvedApplications = await Application.find({ 
    job: { $in: jobId },
    status: 'approved'
  })
    .populate({
      path: "applicant",
    })
    .populate({
      path: "job",
      populate: {
        path: "company"
      }
    })
    .sort({ createdAt: -1 })
    .lean();

  if (!approvedApplications || approvedApplications.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, [], "No approved applications found")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, approvedApplications, "Here are all approved applications")
    );
});

const scheduleInterview = asyncHandler(async (req, res) => {
  const recruiter = req.user.id;
  const { applicationId, time, phase, feedback, date } = req.body;

  if (!applicationId || !time || !phase || !date) {
    throw new ApiError(
      400,
      "Please provide application ID, time slot, date, and interview phase"
    );
  }

  const application = await Application.findById(applicationId)
    .populate("applicant")
    .populate("job");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // Check if application is approved
  if (application.status !== 'approved') {
    throw new ApiError(400, "Only approved applications can be scheduled for interviews");
  }

  // Convert date to timestamp if it's a string
  let dateTimestamp = date;
  if (typeof date === 'string') {
    dateTimestamp = new Date(date).getTime();
  }

  const interviewSchedule = await Interview.create({
    applicant: application._id, // Store application ID, not applicant ID
    job: application.job._id,
    time,
    phase: Number(phase),
    feedback,
    date: dateTimestamp,
    createdBy: recruiter,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        interviewSchedule,
        "Interview Scheduled successfully"
      )
    );
});

const deleteInterview = asyncHandler(async (req, res) => {
  const interviewId = req.params.id;

  const deletedInterview = await Interview.findByIdAndDelete(interviewId);

  if (!deletedInterview) {
    throw new ApiError(404, "Interview not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedInterview, "Interview deleted successfully")
    );
});

const reScheduleInterview = asyncHandler(async (req, res) => {
  const { date, time } = req.body;
  if (!(date && time)) {
    throw new ApiError(
      404,
      "Please select a new Date and Time for rescheduling the interview"
    );
  }
  const rescheduledInterview = await Interview.findByIdAndUpdate(
    req.interview.id,
    {
      $set: {
        date: date,
        time: time,
      },
    }
  );

  return res
    .staus(200)
    .json(
      new ApiResponse(
        200,
        rescheduledInterview,
        `Interview get rescheduled to ${date}`
      )
    );
});

const getAllInterviews = asyncHandler(async (req, res) => {
  const recruiterId = req.user.id;

  const interviews = await Interview.find({ createdBy: recruiterId })
    .populate({
      path: "applicant",
      populate: [
        {
          path: "applicant",
          select: "fullName email phoneNumber profilePhoto"
        },
        {
          path: "job",
          populate: {
            path: "company",
            select: "name logo"
          }
        }
      ]
    })
    .populate({
      path: "job",
      populate: {
        path: "company",
        select: "name logo"
      }
    })
    .sort({ date: 1, time: 1 });

  if (!interviews || interviews.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, [], "No interviews scheduled yet")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, interviews, "Here is your all scheduled interviews")
    );
});

export {
  scheduleInterview,
  getAllApplications,
  getApprovedApplications,
  getAllInterviews,
  reScheduleInterview,
  deleteInterview,
};
