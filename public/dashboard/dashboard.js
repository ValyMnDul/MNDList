const main = document.getElementById("main");
const text = document.getElementById("text");

let count = 0;

async function getNotes() 
{
    const notes = await fetch('/api/get_notes', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        }
    });
    const notesJSON = await notes.json();

    count = 0;

    notesJSON.notes.forEach(note => 
    {
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

        deleteBtn.onclick = async () => 
        {
            div.style.display = "none";
            
            notesJSON.notes = notesJSON.notes.filter(n => n.id !== noteId);
            
            const response = await fetch('/api/get_id', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({notesJSON})
            });
        };

        div.appendChild(textarea);
        div.appendChild(deleteBtn);
        main.appendChild(div);
        
        count++;
    });
}

getNotes();

async function addTask() 
{
    if (text.value !== "") 
    {
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

        deleteBtn.onclick = async () => 
        {
            div.style.display = "none";
            
            const deleteResponse = await fetch('/api/get_notes', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const currentNotesJSON = await deleteResponse.json();
            
            currentNotesJSON.notes = currentNotesJSON.notes.filter(n => n.id !== newNoteId);
            
            await fetch('/api/get_id', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({notesJSON: currentNotesJSON})
            });
        }

        div.appendChild(textarea);
        div.appendChild(deleteBtn);
        main.appendChild(div);

        const response = await fetch('/api/notes', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
                id: newNoteId,
                note: text.value
            })
        });

        const responseJSON = await response.json();
        text.value = "";
    }
}