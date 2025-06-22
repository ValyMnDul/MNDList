const main = document.getElementById("main");
const text = document.getElementById("text");

let count = 0;

// Verifică dacă este primul load (nu refresh)
if (!sessionStorage.getItem('hasRefreshed')) {
    // Marchează că s-a făcut refresh-ul
    sessionStorage.setItem('hasRefreshed', 'true');
    
    // Așteaptă o secundă și apoi refresh
    setTimeout(() => {
        location.reload();
    }, 1000);
} else {
    // Este al doilea load, rulează aplicația normal
    getNotes();
}

async function getNotes() {
    try {
        const notes = await fetch('/api/get_notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Verifică dacă răspunsul este OK
        if (!notes.ok) {
            throw new Error(`HTTP error! status: ${notes.status}`);
        }
        
        // Verifică dacă răspunsul este JSON
        const contentType = notes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Răspunsul nu este JSON valid');
        }
        
        const notesJSON = await notes.json();
        
        // Verifică dacă notesJSON are structura corectă
        if (!notesJSON || !notesJSON.notes) {
            console.error('Structura JSON invalidă:', notesJSON);
            return;
        }

        count = 0;

        notesJSON.notes.forEach(note => {
            const div = document.createElement("div");

            div.style.display = "flex";
            div.style.columnGap = "20px";
            div.style.flexWrap = "wrap";
            div.style.rowGap = "20px";
            div.style.justifyContent = "center";

            const textarea = document.createElement("textarea");
            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Delete";
            deleteBtn.style.backgroundColor = "#dee2e6";
            deleteBtn.style.width = "100px";
            deleteBtn.style.height = "80px";
            deleteBtn.style.color = "#212529";
            deleteBtn.style.fontSize = "1.5em";
            deleteBtn.style.borderRadius = "10px";
            deleteBtn.style.fontFamily = "Courier New', Courier, monospace";
            deleteBtn.style.fontWeight = 600;
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.outline = "none";

            textarea.textContent = note.note;
            
            const noteId = note.id;

            deleteBtn.onclick = async () => {
                div.style.display = "none";
                
                notesJSON.notes = notesJSON.notes.filter(n => n.id !== noteId);
                
                const response = await fetch('/api/get_id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        notesJSON
                    })
                });
                
                if (response.ok) {
                    console.log('Notița a fost ștearsă cu succes');
                } else {
                    console.error('Eroare la ștergerea notiței');
                    div.style.display = "block";
                }
            };

            div.appendChild(textarea);
            div.appendChild(deleteBtn);
            main.appendChild(div);
            
            div.getBoundingClientRect();
            
            count++;
        });
        
    } catch (error) {
        console.error('Eroare la încărcarea notelor:', error);
    }
}

async function addTask() {
    if (text.value !== "") {
        const newNoteId = `note_${Date.now()}`;
        
        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.columnGap = "20px";
        div.style.flexWrap = "wrap";
        div.style.rowGap = "20px";
        div.style.justifyContent = "center";

        const textarea = document.createElement("textarea");
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "#dee2e6";
        deleteBtn.style.width = "100px";
        deleteBtn.style.height = "80px";
        deleteBtn.style.color = "#212529";
        deleteBtn.style.fontSize = "1.5em";
        deleteBtn.style.borderRadius = "10px";
        deleteBtn.style.fontFamily = "Courier New', Courier, monospace";
        deleteBtn.style.fontWeight = 600;
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.outline = "none";

        textarea.textContent = text.value;

        deleteBtn.onclick = async () => {
            div.style.display = "none";
            
            const deleteResponse = await fetch('/api/get_notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const currentNotesJSON = await deleteResponse.json();
            
            currentNotesJSON.notes = currentNotesJSON.notes.filter(n => n.id !== newNoteId);
            
            await fetch('/api/get_id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    notesJSON: currentNotesJSON
                })
            });
        }

        div.appendChild(textarea);
        div.appendChild(deleteBtn);
        main.appendChild(div);

        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: newNoteId,
                note: text.value
            })
        });

        const responseJSON = await response.json();
        text.value = "";
    }
}