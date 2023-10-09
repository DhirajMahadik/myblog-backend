import express from 'express';
import verifyUser from '../middlewares/verifyUser.js';
import JWT from 'jsonwebtoken'
import database from '../database/config.js';
import Cloudinary from 'cloudinary'
import multer from 'multer';
import path from 'path';


const cloudinary = Cloudinary.v2

 cloudinary.config({
    cloud_name: "djmp17jsh",
    api_key: "144788257939745",
    api_secret: "pU3s1YTh-zNkit2umw9S2YABNfk"
  });


  const multerUploads = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, true)
    }

}).single('thumbnail');

const router = express.Router();
const secreteKey = 'qwertyuiop987654321'

router.post('/',verifyUser,multerUploads, (req,res)=>{
        try {
            const date = Date()
            JWT.verify(req.token, secreteKey,(error, authData)=>{
                if(error) res.status(404).send({error:'session timeout'})
                let addQuery = 'insert into blogs (title,category,description,headline,thumbnail,date) values (?,?,?,?,?,?)'
                cloudinary.uploader.upload(req.file.path,(error,result)=>{
                    if(error) res.status(500);
                    database.query(addQuery,[req.body.title,req.body.category,req.body.description,req.body.headline,result.url,date],(error, response)=>{
                        if(error) res.status(500).json('could not add blog')
                        res.send({message:'Blog posted successfully'})
                    })
                })
                
            })
            
        } catch (error) {
            res.status(500).send({error:'something went wrong'})
        }
})

export default router