const express=require('express');
const Route=express.Router();
const apiController=require('../controllers/authControllerApi');
const userAuthApi=require('../middlewares/userAuthApi');

Route.get('/',apiController.register);
Route.post('/add-register',[userAuthApi.verifyStudent],apiController.addRegister);
Route.post('/login',apiController.login);
Route.get('/logout',apiController.logout);


module.exports=Route