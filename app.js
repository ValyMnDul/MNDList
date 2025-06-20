const express=require('express');
const fs=require('fs');

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
