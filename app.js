const express=require('express');

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

app.get('/settings',(req,res)=>
{
    res.render('settings',{title:"Settings"});
});

app.get('/learn_more',(req,res)=>
{
    res.render('learnMore',{title:"Learn More"});
});

app.use((req,res)=>
{
    res.status(404).render('404',{title:"404"});
});