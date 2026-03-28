const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();

// Setări obligatorii pentru Vercel
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// Rută de DEBUG - Accesează site-ul tău /debug după deploy
app.get('/debug', (req, res) => {
    res.json({
        dirname: __dirname,
        viewsPath: viewsPath,
        viewsExists: fs.existsSync(viewsPath),
        filesInRoot: fs.readdirSync(__dirname)
    });
});

let temporaryStorage = {};

app.use((req, res, next) => {
    let userID = req.cookies.ID || uuidv4();
    if (!req.cookies.ID) res.cookie('ID', userID, { httpOnly: true, maxAge: 86400000 });
    req.userID = userID;
    if (!temporaryStorage[userID]) temporaryStorage[userID] = { notes: [] };
    next();
});

app.get('/', (req, res) => res.render('home', { title: "MNDList" }));
app.get('/dashboard', (req, res) => res.render('dashboard', { title: "Dashboard" }));
app.get('/settings', (req, res) => res.render('settings', { title: "Settings" }));
app.get('/learn_more', (req, res) => res.render('learnMore', { title: "Learn More" }));
app.get('/contact', (req, res) => res.render('contact', { title: "Contact" }));

// API-urile tale rămân la fel
app.post('/api/notes', (req, res) => {
    temporaryStorage[req.userID].notes.push(req.body);
    res.json(`Succes`);
});
app.post('/api/get_notes', (req, res) => res.json(temporaryStorage[req.userID]));

app.use((req, res) => res.status(404).render('404', { title: "404" }));

module.exports = app;