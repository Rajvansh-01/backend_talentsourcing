import express from 'express';
import multer from 'multer';
import path from 'path';
var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

function fileFilter (req, file, cb) {    
    const filetypes = /jpeg|jpg|png|gif/;

    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}
  
var upload = multer({
    storage:Storage,
    limits : {fileSize : 1000000},
    fileFilter: fileFilter
}).single('file');


export default upload;
export {upload};