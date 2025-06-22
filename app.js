const express=require('express');
const cookieParser=require('cookie-parser')
const {v4:uuidv4}=require('uuid');
const fs = require('fs');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



///////API

app.post('/api/notes',(req,res)=>
{  
    try {
        const filePath = `./notes/${req.userID}.json`;
        let noteJSON;
        
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8').trim();
            if (fileContent) {
                noteJSON = JSON.parse(fileContent);
            } else {
                noteJSON = { notes: [] };
            }
        } else {
            noteJSON = { notes: [] };
        }
        
        noteJSON.notes.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(noteJSON, null, 2));
        res.json(`Succes`);
    } catch (error) {
        console.error('Eroare la adăugarea notei:', error);
        const noteJSON = { notes: [req.body] };
        fs.writeFileSync(`./notes/${req.userID}.json`, JSON.stringify(noteJSON, null, 2));
        res.json(`Succes`);
    }
}); 

app.post('/api/get_notes', (req, res) => {
    try {
        const filePath = `./notes/${req.userID}.json`;
        
        if (!fs.existsSync(filePath)) {
            const emptyNotes = { notes: [] };
            fs.writeFileSync(filePath, JSON.stringify(emptyNotes, null, 2));
            return res.json(emptyNotes);
        }
        
        const fileContent = fs.readFileSync(filePath, 'utf8').trim();
        
        if (!fileContent) {
            const emptyNotes = { notes: [] };
            fs.writeFileSync(filePath, JSON.stringify(emptyNotes, null, 2));
            return res.json(emptyNotes);
        }
        
        const noteJSON = JSON.parse(fileContent);
        res.json(noteJSON);
    } catch (error) {
        console.error('Eroare la citirea fișierului:', error);
        const emptyNotes = { notes: [] };
        fs.writeFileSync(`./notes/${req.userID}.json`, JSON.stringify(emptyNotes, null, 2));
        res.json(emptyNotes);
    }
});

app.post('/api/get_id',(req,res)=>
{
    try {
        const notesData = req.body.notesJSON || req.body;
        
        const dataToSave = {
            notes: notesData.notes || []
        };
        
        fs.writeFileSync(`./notes/${req.userID}.json`, JSON.stringify(dataToSave, null, 2));
        res.json("Deleted");
    } catch (error) {
        console.error('Eroare la ștergerea notei:', error);
        res.status(500).json({ error: 'Eroare la ștergerea notei' });
    }
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
        res.cookie('ID',userID,{httpOnly:true,maxAge:3600000*100});
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

app.use((req,res)=>
{
    res.status(404).render('404',{title:"404"});
});
