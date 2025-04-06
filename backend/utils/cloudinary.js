import 'dotenv/config';
import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// const uploadOnCloudinary = async(localFilePath)=>{
//     try {
//         if(!localFilePath){
//             console.error("No file path provided for upload.");
//             return null;
//         };

//         // Verify that the file exists before attempting to upload
//         if (!fs.existsSync(localFilePath)) {
//             console.error("File does not exist at path:", localFilePath);
//             return null;
//         }
//         //upload the file on clodinary
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto",
//             folder:"Job_Portal/resumes",
//             type: "upload",
//             use_filename: true,
            
//         })

//         // console.log("File uploaded successfully:", response.url);

//         // File uploaded, now delete it from the server
//         try {
//             fs.unlinkSync(localFilePath);
//         } catch (unlinkError) {
//             console.error(`Error deleting file from local server: ${unlinkError.message}`);
//         }

//         return response;
//     } catch (error) {
//         //if upload fails remove the locally saved file from the server
//         console.error("Error uploading file to Cloudinary:", error.message);

//         // Attempt to delete the local file if it exists
//         try {
//             fs.unlinkSync(localFilePath);
//         } catch (unlinkError) {
//             console.error(`Error deleting file after failed upload: ${unlinkError.message}`);
//         }

//         return null;
//     }
// }

const uploadOnCloudinary = async(fileBuffer, originalname)=>{
    if (!fileBuffer || !originalname) {
        console.error("Missing file buffer or filename.");
        return null;
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: "Job_Portal/resumes",
            use_filename: true,
            filename_override: originalname,
        }, (error, result) => {
            if (error) {
                console.error("Error uploading file to Cloudinary:", error.message);
                reject(null);
            } else {
                resolve(result);
            }
        });

        stream.end(fileBuffer);
    });
}

const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return null;
        const response = await cloudinary.uploader.destroy(public_id, {
            resource_type: "auto"
        });
        return response;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error.message);
        return null;
    }
};

export {uploadOnCloudinary,deleteFromCloudinary}