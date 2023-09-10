const { log } = require('console');
const File = require('../models/file');

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
           console.log(error);
    }
}