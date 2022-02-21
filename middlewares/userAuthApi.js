const authModel=require('../models/authModel');

exports.verifyStudent=(req,res,next)=>{
    authModel.findOne({
        name:req.body.username
    }).exec((err,student)=>{
        if(err){
            console.log(err,"Error while finding student name");
            return res.status(404).json({
                message:"Cannot find student name."
            })
        }
        if(student){
            console.log("Student name already exists");
            return res.status(404).json({
                message:"Student name already exists."
            })
        }
        authModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log((err,"Error while finding student email"));
                return res.status(404).json({
                    message:"Cannot find student email."
                })
            }
            if(email){
                console.log(("Student email already exists"));
                return res.status(404).json({
                    message:"Student email already exists."
                })
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password!==confirm){
                console.log("Pasword and confirm password does not match");
                return res.status(404).json({
                    message:"Pasword and confirm password does not match."
                })
            }
            next();
        })
    })
}