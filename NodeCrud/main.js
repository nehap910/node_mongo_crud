//re
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;


///Database Connection 
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log("connected to Database!!!"));



////Middlewares

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(session({
    secret:'My secrete key',
    saveUninitializedy:true,
    resave:false,
}));


app.use((req,res,next)=>{
    res.locals.message =req.session.message;
    delete req.session.message;
    next();
});


app.use(express.static('uploads'));

///set template engine

app.set('view engine','ejs');


// app.get('/',(req,resp) =>{
//     resp.send("Hello World");
// });

///Route Prefix

app.use("",require("./routes/routes"));

app.listen(PORT, ()=>{
    console.log(`server Start at http://localhost:${PORT}`);
});