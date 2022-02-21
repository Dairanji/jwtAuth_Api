const express=require('express');
const Route=express.Router();
const authController=require('../controllers/authController');
const verify=require('../middlewares/verify');

Route.get('/',authController.register);
Route.post('/add-register',[verify.verifyStudent],authController.addRegister);
Route.get('/login',authController.login);
Route.post('/add-login',authController.addLogin);
Route.get('/dashboard',authController.userAuth,authController.dashboard);
Route.get('/logout',authController.logout);


module.exports=Route