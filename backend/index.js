import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/connection.js";
// import { ApiError } from "./utils/ApiError.js";

const app = express();

dotenv.config({
    path: "./.env"
})

//middlewares
app.use(express.json({limit:"16mb"}));
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
console.log("Allowed CORS Origin:", process.env.CORS_ORIGIN);

//connection
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:", error);
        throw error;
    })
    app.listen(process.env.PORT||10000,()=>{
    console.log(`Server running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err,"MongoDB Connection is failed");  
})

//routes
import userRouter from "./routes/user.routes.js"
import applicationRouter from "./routes/application.routes.js"
import jobRouter from "./routes/job.routes.js"
import companyRouter from "./routes/company.routes.js"

//routes declaration
app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/company",companyRouter)


app.use((err, req, res, next) => {
    console.error("❌ Error Middleware:", err); // Debugging logs

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});

