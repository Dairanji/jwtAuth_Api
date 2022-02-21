const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authModel=require('../models/authModel');

//login page controller api.
exports.login=(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: "Welcome To Student Login System :)"
    })
}

//login store data controller api.
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
                    res.status(200).json({
                        status: 'success',
                        message: "Welcome To Student Dashboard"
                    })
                }else{
                    console.log('Invalid Password...');
                    res.status(405).json({
                        result:err,
                        message: "Invalid Password"
                    })
                }
            }else{
                console.log('Status false...');
                res.status(405).json({
                    result: err,
                    message: "Status false,cant login"
                })
            }
        }else{
            console.log('Invalid email or username...');
            res.status(200).json({
                result: err,
                message: "Invalid email or username..."
            })
        }

    })
}

//register page controller api.
exports.register=(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: "Welcome To Student Register System :)"
    })
}

//register store controller api.
exports.addRegister=(req,res)=>{
    authModel({
        name:req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        qualification: req.body.qualification,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err,student)=>{
        if(!err){
            res.status(200).json({
                status: 'success',
                result: student,
                message: "User Added Successfully"
            });
        }else{
            res.status(404).json({
                result: err,
                message: "User Not Added..."
            });
        }
    })
        
}

//logout controller api.
exports.logout=(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({
        status: 'success',
        message: "Logout Successfully"
    })
}