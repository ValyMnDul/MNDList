const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Simulăm o bază de date în memorie (se șterge la restart)
let temporaryStorage = {};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Middleware pentru ID
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

app.post('/api/notes', (req, res) => {
    temporaryStorage[req.userID].notes.push(req.body);
    res.json(`Succes`);
});

app.post('/api/get_notes', (req, res) => {
    res.json(temporaryStorage[req.userID] || { notes: [] });
});

app.post('/api/get_id', (req, res) => {
    const notesData = req.body.notesJSON || req.body;
    temporaryStorage[req.userID].notes = notesData.notes || [];
    res.json("Deleted/Updated");
});

app.get('/', (req, res) => res.render('home', { title: "MNDList" }));
app.get('/dashboard', (req, res) => res.render('dashboard', { title: "Dashboard" }));
app.get('/settings', (req, res) => res.render('settings', { title: "Settings" }));
app.get('/learn_more', (req, res) => res.render('learnMore', { title: "Learn More" }));
app.get('/contact', (req, res) => res.render('contact', { title: "Contact" }));

app.use((req, res) => res.status(404).render('404', { title: "404" }));

// Port pentru rulare locală
const PORT = process.env.PORT || 2100;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server "la mișto" pe http://localhost:${PORT}`));
}

module.exports = app;