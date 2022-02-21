const adminModel=require('../models/adminModel');

exports.verifyAdmin=(req,res,next)=>{
    adminModel.findOne({
        name:req.body.username
    }).exec((err,admin)=>{
        if(err){
            console.log(err,"Error while finding admin name");
            return res.redirect('/admin/signup');
        }
        if(admin){
            console.log("Admin name already exists");
            return res.redirect('/admin/signup');
        }
        adminModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log((err,"Error while finding admin email"));
                return res.redirect('/admin/signup');
            }
            if(email){
                console.log(("Admin email already exists"));
                return res.redirect('/admin/signup');
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password!==confirm){
                console.log("Pasword and confirm password does not match");
                return res.redirect('/admin/signup');
            }
            next();
        })
    })
}