const express=require('express');
const fs=require('fs');
const { title } = require('process');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.listen(3000,'0.0.0.0')

///////ROUTES

app.get('/',(req,res)=>
{
    res.render('home',{title:"MNDList"});
});

app.get('/dashboard',(req,res)=>
{
    res.render('dashboard',{title:"Dashboard"});
});