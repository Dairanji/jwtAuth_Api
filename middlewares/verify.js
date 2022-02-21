const authModel=require('../models/authModel');

exports.verifyStudent=(req,res,next)=>{
    authModel.findOne({
        name:req.body.username
    }).exec((err,student)=>{
        if(err){
            console.log(err,"Error while finding student name");
            return res.redirect('/');
        }
        if(student){
            console.log("Student name already exists");
            return res.redirect('/');
        }
        authModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log((err,"Error while finding student email"));
                return res.redirect('/');
            }
            if(email){
                console.log(("Student email already exists"));
                return res.redirect('/');
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password!==confirm){
                console.log("Pasword and confirm password does not match");
                return res.redirect('/');
            }
            next();
        })
    })
}