// Taking instance of expresss 
const express = require('express');
const app = express();

//finding the port 
require('dotenv').config();
const PORT = process.env.PORT || 8000;

// adding body parser and middleware 
app.use(express.json());

// fileUploader middleware, upload media on server
const fileUpload = require('express-fileupload');
app.use(fileUpload({
   useTempFiles : true,
   tempFileDir : '/tmp/'
}));

// connecting to db 
const db = require('./config/database');
db(); 


// connecting to the cloudinary, upload media on server then on cloudinary then delete from server
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// api routes adding 
const Upload = require('./routes/fileupload');
app.use('/api/v1/upload', Upload);


app.listen(PORT, () => {
   console.log(`Server is running successfully at port ${PORT}`);
})

app.get('/', (req, res) => {
   res.send('<h1>This is home page </h1>');
})
