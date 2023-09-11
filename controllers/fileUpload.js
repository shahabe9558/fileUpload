const { log } = require('console');
const File = require('../models/file');
const cloudinary = require('cloudinary');

// localfile upload handler function 

exports.localFileUpload = async (req, res) => {
    try{
       // way of fetching the file 
       const file = req.files.filenameOnfrontend;
       console.log("Fille mil gaya ->", file);
       
       //path mil gaya 
       let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
       console.log("path ->", path);

       file.mv(path, (err) => {
        console.log(err);
       });
       res.json({
        success: true,
        message:"Local file uploaded successfully",
       })
    } 
    catch(error){
           console.log("Not able tpo upload the file on server");
           console.log(error);
    }
} 

function isFileTypeSupporeted(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    console.log("tempfile path is -> ", file.tempFilePath);
    await cloudinary.v2.uploader.upload(file.tempFilePath, options);
    
    
}

exports.uploadImage = async (req, res) =>{
    try{
        // fetch fdata 
        const {name, tags, email} = req.body;

        // fetch the folder 
        const file = req.files.imageFile;
        // console.log(file);

        // vlaidation 
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        console.log("File type is => ", fileType);

        if(!isFileTypeSupporeted(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"This file type is not supported",
            })
        }

    
        // file format supported hai 
        const response = await uploadFileToCloudinary(file, "Testing");

        console.log("file is => ", file);
        console.log("Response is -> ", response);

        // db me entry kar do 
        // const fileData = await File.create({
        //     name, 
        //     tags,
        //     email
        // })

        res.json({
            success:true,
            message:"Image Successfully uploaded",
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Errror while uploading the image",
           
        })
    }
}


