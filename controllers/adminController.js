const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const adminModel=require('../models/adminModel');

//login page controller.
exports.adminLogin=(req,res)=>{
    res.render('admin/adminLogin',{
        title:'Login Page',
        data:req.admin
    })
}

//login store data controller.
exports.addLogin=(req,res)=>{
    adminModel.findOne({
        email:req.body.email
    }, (err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token=jwt.sign({
                        id:data._id,
                        username:data.name,
                        email:data.email
                    },'mitra@535jhgfsajf',{expiresIn:'5m'});
                    res.cookie('adminToken',token);
                    res.redirect('/admin/dashboard');
                }else{
                    console.log('Invalid Password...');
                    res.redirect('/admin/');
                }
            }else{
                console.log('Status false...');
                res.redirect('/admin/');
            }
        }else{
            console.log('Invalid email or username...');
            res.redirect('/admin/');
        }

    })
}

//adminAuth middleware controller.
exports.adminAuth=(req,res,next)=>{
    if(req.admin){
        console.log(req.admin);
        next();
    }else{
        console.log(req.admin,'err');
        res.redirect('/admin/')
    }
}

//register page controller.
exports.adminSignup=(req,res)=>{
    res.render('admin/adminSignup',{
        title:'Signup Page',
        data:req.admin
    })
}

//register store controller.
exports.addRegister=(req,res)=>{
    adminModel({
        name:req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("New admin added....");
        res.redirect('/admin/')
    }).catch(err => {
        console.log(err, "error while adding admin");
        res.redirect('/admin/')
    })
}

//dashboard page controller.
exports.adminDashboard=(req,res)=>{
    res.render('admin/adminDashboard',{
        title:'Dashboard Page',
        data:req.admin
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('adminToken');
    res.redirect('/admin/')
}