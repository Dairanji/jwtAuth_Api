const express=require('express');
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const session=require('express-session');
const bcrypt=require('bcryptjs');
const cookie=require('cookie-parser');
const jwt=require('jsonwebtoken');
const app=express();

//set cookie.
app.use(session({
    cookie:{
        maxAge:60000
    },
    secret: 'shayan123',
    resave: false,
    saveUninitialized: false
}))
app.use(cookie());

//set student authentication.
const userAuth=require('./middlewares/userAuth');
app.use(userAuth.authJwt);

//set admin auth.
const adminAuth=require('./middlewares/adminAuth');
app.use(adminAuth.authJwt);

//urlencoded(buffer data)
app.use(express.urlencoded({
    extended:true
}));

//set view engine.
app.set('view engine','ejs');
app.set('views','views');

//set a static folder.
app.use(express.static(path.join(__dirname,'public')));

//set router connection.
const authroute=require('./routes/authRoute');
app.use(authroute);

//set admin router connection.
const adminRoute=require('./routes/adminRoute');
app.use('/admin/',adminRoute);

//set api connection.
const apiRoute=require('./routes/authRouteApi');
app.use('/api',apiRoute);

//connect mongodb.
const dbDriver="#"

//connect ports.
const port=process.env.PORT || 3080
mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(result=>{
    app.listen(port,()=>{
        console.log(`Connection Successful`);
        console.log(`Server running at http://localhost:${port}`);
    })
});