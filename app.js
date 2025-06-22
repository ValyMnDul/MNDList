const express=require('express');
const cookieParser=require('cookie-parser')
const {v4:uuidv4}=require('uuid');
const fs = require('fs');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use((req,res,next)=>
{
    if(!fs.existsSync(`./notes/`))
    {
        fs.mkdirSync('./notes/');
    }
    next();
});

app.use((req,res,next) =>
{
    if(!req.cookies.ID)
    {
        const userID=uuidv4();
        res.cookie('ID',userID,{httpOnly:true,maxAge:3600000});
        fs.writeFileSync(`./notes/${userID}.json`,JSON.stringify({notes:[]}));
        req.userID=userID;
    }
    else
    {
        req.userID=req.cookies.ID;
    }
    next();
});

app.listen(2100,'0.0.0.0');


///////API

app.post('/api/notes',(req,res)=>
{  
    let noteJSON=JSON.parse(fs.readFileSync(`./notes/${req.userID}.json`).toString());
    noteJSON.notes.push(req.body);
    fs.writeFileSync(`./notes/${req.userID}.json`,JSON.stringify(noteJSON, null, 2));
    res.send(noteJSON);
}); 

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

app.get('/contact',(req,res)=>
{
    res.render('contact',{title:"Contact"});
});

app.use((req,res)=>
{
    res.status(404).render('404',{title:"404"});
});
