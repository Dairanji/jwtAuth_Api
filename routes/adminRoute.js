const express=require('express');
const Route=express.Router();
const adminController=require('../controllers/adminController');
const adminVerify=require('../middlewares/adminVerify');

Route.get('/',adminController.adminLogin);
Route.post('/add-login',adminController.addLogin)
Route.get('/signup',adminController.adminSignup);
Route.post('/add-signup',[adminVerify.verifyAdmin],adminController.addRegister)
Route.get('/dashboard',adminController.adminAuth,adminController.adminDashboard);
Route.get('/logout',adminController.logout);


module.exports=Route