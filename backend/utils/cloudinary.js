import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath)return null;
        //upload the file on clodinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        //file has been uploaded successfully
        //now delete it from the server
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        //if upload fails remove the locally saved file from the server
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}