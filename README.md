# MNDList 
**🔗 Live Site:** [MNDList](https://mndlist.valymnd.hackclub.app)

**MNDList** is a simple ToDo List web app built with **Node.js** and **Express**. It allows users to add and delete notes, which are stored directly in browser cookies — no database required.

![main](/MD_Assets/main.png)

## 🔧 Features

- ✅ Add notes
- 🗑️ Delete notes
- 🍪 Notes are saved using cookies (per browser)
- 🖥️ Simple and clean user interface

## 📦 Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- HTML & CSS (for frontend)

## 🚀 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/MNDList.git
cd MNDList
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

4. Open your browser and go to:
```
http://localhost:2100
```

## ⚙️ How It Works

- Notes are stored locally in the user's browser using cookies.
- When a note is added or deleted, the cookie is updated.
- Since no database is used, the notes are only available in that browser session.

## ⚠️ Limitations

- Notes are saved only in the browser (no sync across devices).
- Clearing cookies will delete all saved notes.
- No login or user authentication.
