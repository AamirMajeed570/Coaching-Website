const http = require("http");
const express = require("express");
const path = require("path");
const port = 80;
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/khancoachingacademy',{useNewUrlParser:true});
//khanCoachingAcademy is a Database
const contactSchema = new mongoose.Schema({
    name: String,
    parents: String,
    residence: String,
    contact: String,
    division: String,
    email: String
  });
const student = mongoose.model('student', contactSchema);
// contact is a collection

//PATH 
app.use('/static',express.static('static'));//serving Static Files Using Express
app.use(express.urlencoded());

//PUG Specific Stuff
app.set('view engine','pug');//set The Template Engine as Pug
app.set('views',path.join(__dirname,'views'))//set the views Directory


app.get('/',(req,res)=>{
    const par = { };
    res.status(200).render('home.pug',par);
})
app.get('/contact',(req,res)=>{
    const par = { };
    res.status(200).render('contact.pug',par);
})
app.get('/home',(req,res)=>{
    const par = { };
    res.status(200).render('home.pug',par);
})
app.get('/gallery',(req,res)=>{
    const par = { };
    res.status(200).render('gallery.pug',par);
})
app.post('/contact', (req, res)=>{
    var myData = new student(req.body);
    myData.save().then(()=>{
    res.send(`<h1>Thanks! ${req.body.name} Your Form Has Been Submitted Successfully</h1>`)
    }).catch(()=>{
    res.status(400).send(`<h1>Sorry! ${req.body.name} Some Error Ocurred</h1>`)
    })
});
app.get('/alumni',(req,res)=>{
    const par = { };
    res.status(200).render('alumni.pug',par);
})

app.listen(port, () => {
    console.log(`The application started succesfully on ${port}`);
})