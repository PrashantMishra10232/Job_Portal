import mongoose from "mongoose";
import { Application } from "./application.model.js";
import { Job } from "./job.model.js";
import { User } from "./user.model.js";

const interviewSchema = new mongoose.Schema({
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Application
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Job
    },
    date:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        enum:['10:00-10:15','10:15-10:30','10:30-10:45','10:45-11:00','12:00-12:15','12:15-12:30','12:30-12:45','12:45-01:00'],
        required:true
    },
    phase:{
        type:Number,
        enum:[1,2,3,4],
        required:true,
    },
    feedback:{
        type:String,
        enum:["Positive","Negative"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
})

export const Interview = new mongoose.model("Interview",interviewSchema)