const upload = require("../middleware/multer.js");
const Details = require("../models/Details.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const fs=require("fs");
const express = require("express");
const router = express.Router();
router.post("/resume",upload.single("resume"), asyncHandler(async (req, res) => {
    try {
        let {
            name,
            email,
            contact,
        } = req.body

        // console.log(req.body);
        const localFilePath = req.file?.path;
        let response;
        if (localFilePath){
            response = await uploadOnCloudinary(localFilePath);
        }
        console.log("RESPONSE: ", response);
        if (localFilePath && !response) {
            fs.unlinkSync(localFilePath)
            return new ApiError(500, "Error uploading file to cloudinary")
        }

        const resumeUrl= await response?.url;
        console.log("RESUMEURL: ", resumeUrl);
        
        let detail = await Details.create({
           name,
           email,
           contact,
           resume: resumeUrl
        })

        if (!details) {
            throw new ApiError(500, "Something went wrong while creating job")
        }
        

        return res.status(200).json(new ApiResponse(200, "Job added successfully"))
    } catch (error) {
        console.log("Error in adding resume", error);
        throw new ApiError(500, "Something went wrong while adding resume")
    }
})
)
module.exports=router;