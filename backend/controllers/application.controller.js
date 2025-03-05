import {Application} from "../models/application.model.js"
import {Job} from "../models/job.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"



const applyJob = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const jobId = req.params.id;
    
    const existedApplication = await Application.findOne({job: jobId, applicant:userId})

    if(existedApplication){
        throw new ApiError(400,"You have already applied for this jobs")
    }

    const job = await Job.findById(jobId);
    if(!job){
        throw new ApiError(404,"No job found")
    }

    const newApplication = await Application.create({
        job:jobId,
        applicant:userId
    });

    job.application.push(newApplication._id);
    await job.save();
    return res.status(200).json(new ApiResponse(200,newApplication,"Job applied successfully"))
})

const getAppliedJobs = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        populate:{path:'company'}
    });
    if(!application){
        throw new ApiError(404,"No Applications")
    }
    return res.status(200).json(new ApiResponse(200,application,"All applied jobs"))
})

//admin
const getApplications = asyncHandler(async(req,res)=>{
    const jobId = req.params.id;

    const jobs = await Job.findById(jobId).populate({
        path:"application",
        populate:{
            path:"applicant"
        }
    })

    if(!jobs){
        throw new ApiError(404,"jobs not found")
    }

    if (Array.isArray(jobs.application)) {
        jobs.application.sort((a, b) => b.createdAt - a.createdAt);
    }

    return res.status(200).json(new ApiResponse(200,jobs,"All applications"))
})

const updateStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body;
    const applicationId = req.params.id;

    const allowedStatuses = ["pending", "approved", "rejected"];
    if (!status || !allowedStatuses.includes(status.toLowerCase())) {
        throw new ApiError(400, "Invalid status. Allowed values: pending, approved, rejected");
    }

    const application = await Application.findByIdAndUpdate(
        applicationId,
        { status: status.toLowerCase() },
        { new: true }
    );
    if(!application){
        throw new ApiError(404,"No application found")
    }

    return res.status(200).json(new ApiResponse(200,application,"Status updated successfully"))
})

export {applyJob,getAppliedJobs,getApplications,updateStatus}