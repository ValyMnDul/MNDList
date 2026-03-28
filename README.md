# MNDList 

**MNDList** is a simple ToDo List web app built with **Node.js** and **Express**. It allows users to add and delete notes, which are stored directly in browser cookies.

![main](/MD_Assets/main.png)

## Features

- Add notes
- Delete notes
- Notes are saved using cookies (per browser)
- Simple and clean user interface

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- HTML & CSS (for frontend)

## How It Works

- Notes are stored locally in the user's browser using cookies.
- When a note is added or deleted, the cookie is updated.
- Since no database is used, the notes are only available in that browser session.

## Limitations

- Notes are saved only in the browser (no sync across devices).
- Clearing cookies will delete all saved notes.
- No login or user authentication.

## Contributing

Pull requests are welcome! If you'd like to contribute or suggest features, feel free to open an issue or fork the repo.

## Licence

MNDList is under [MIT Licence](https://github.com/ValyMnDul/MNDList/blob/main/LICENSE.md)
