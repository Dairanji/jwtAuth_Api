const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authModel=require('../models/authModel');

//login page controller.
exports.login=(req,res)=>{
    res.render('login',{
        title:'Login Page',
        data: req.student_register
    })
}

//login store data controller.
exports.addLogin=(req,res)=>{
    authModel.findOne({
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
                    res.cookie('authToken',token);
                    res.redirect('/dashboard');
                }else{
                    console.log('Invalid Password...');
                    res.redirect('/login');
                }
            }else{
                console.log('Status false...');
                res.redirect('/login');
            }
        }else{
            console.log('Invalid email or username...');
            res.redirect('/login');
        }

    })
}

//userAuth middleware controller.
exports.userAuth=(req,res,next)=>{
    if(req.student_register){
        console.log(req.student_register);
        next();
    }else{
        console.log(req.student_register,'err');
        res.redirect('/login')
    }
}

//register page controller.
exports.register=(req,res)=>{
    res.render('register',{
        title:'Registration Page',
        data: req.student_register
    })
}

//register store controller.
exports.addRegister=(req,res)=>{
    authModel({
        name:req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        qualification: req.body.qualification,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("New student added....");
        res.redirect('/login')
    }).catch(err => {
        console.log(err, "error while adding student");
        res.redirect('/')
    })
}

//dashboard page controller.
exports.dashboard=(req,res)=>{
    authModel.find((err,data)=>{
        if(!err){
            res.render('dashboard',{
                title:'Student | Dashboard',
                viewdata:data,
                data:req.student_register
            })
        }
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('authToken');
    res.redirect('/login')
}