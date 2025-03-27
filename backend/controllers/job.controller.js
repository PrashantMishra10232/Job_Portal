import {Job} from "../models/job.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"

const postJob = asyncHandler(async(req,res)=>{
    const{title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body
    const userId = req.user._id;
     
    if([title,description,requirements,location,jobType,companyId].some((fields)=>fields?.trim()==="")){
        throw new ApiError(404,"All fields are required");
    }

    const job = await Job.create({
        title,
        description,
        requirements: requirements?.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel: experience,
        position,
        company:companyId,
        createdBy:userId
    })

    return res.status(200)
    .json(new ApiResponse(200,job,"Job posted!!"))
})

const getAllJobs = asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword || ""
    const query = {
        $or: [
            {title: {$regex:keyword, $options:'i'}},
            {description: {$regex:keyword, $options: 'i'}}
        ]
    };
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({createdAt: -1});
    if(jobs.length===0){
        throw new ApiError(404,"No jobs found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,jobs,"Available jobs"))
})

const getJobById = asyncHandler(async(req,res)=>{
    const jobId = req.params.id;
    
    const jobs = await Job.findById(jobId).populate({
        path: "application"
    });

    if(!jobs){
        throw new ApiError(404,"No job found")
    }

    return res.status(200)
    .json(new ApiResponse(200,jobs,"Available job"))
})

const getAdminsJobs = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const jobs = await Job.find({createdBy:userId}).populate({
        path:'company',
    }).sort({createdAt: -1})
    if(jobs.length===0){
        throw new ApiError(404,"No Jobs created by you till now")
    }
    return res.status(200).json(new ApiResponse(200,jobs,"Here are the jobs created by you"))
})

export{postJob,getAdminsJobs,getAllJobs,getJobById}