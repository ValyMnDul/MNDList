const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();

// Configurare căi absolute pentru Vercel
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

// Stocare temporară în RAM
let temporaryStorage = {};

app.use((req, res, next) => {
    let userID = req.cookies.ID;
    if (!userID) {
        userID = uuidv4();
        res.cookie('ID', userID, { httpOnly: true, maxAge: 3600000 * 24 });
    }
    req.userID = userID;
    if (!temporaryStorage[userID]) {
        temporaryStorage[userID] = { notes: [] };
    }
    next();
});

app.get('/', (req, res) => res.render('home', { title: "MNDList" }));
app.get('/dashboard', (req, res) => res.render('dashboard', { title: "Dashboard" }));
app.get('/settings', (req, res) => res.render('settings', { title: "Settings" }));
app.get('/learn_more', (req, res) => res.render('learnMore', { title: "Learn More" }));
app.get('/contact', (req, res) => res.render('contact', { title: "Contact" }));

app.post('/api/notes', (req, res) => {
    temporaryStorage[req.userID].notes.push(req.body);
    res.json(`Succes`);
});

app.post('/api/get_notes', (req, res) => {
    res.json(temporaryStorage[req.userID] || { notes: [] });
});

app.post('/api/get_id', (req, res) => {
    const notesData = req.body.notesJSON || req.body;
    if (temporaryStorage[req.userID]) {
        temporaryStorage[req.userID].notes = notesData.notes || [];
    }
    res.json("Updated");
});

app.use((req, res) => res.status(404).render('404', { title: "404" }));

// Pornire locală
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 2100;
    app.listen(PORT, () => console.log(`🚀 Server pe http://localhost:${PORT}`));
}

module.exports = app;