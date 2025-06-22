const main=document.getElementById("main");
const text=document.getElementById("text");

let count=1;
async function addTask()
{

    if(text.value!=="")
    {

        const div=document.createElement("div");

        div.style.display="flex";
        div.style.columnGap="20px";
        div.style.flexWrap="wrap";
        div.style.rowGap="20px";
        div.style.justifyContent="center";

        const textarea=document.createElement("textarea");
        const deleteBtn=document.createElement("button");

        deleteBtn.textContent="Delete";
        deleteBtn.style.backgroundColor="#dee2e6";
        deleteBtn.style.width="100px";
        deleteBtn.style.height="80px";
        deleteBtn.style.color="#212529";
        deleteBtn.style.fontSize="1.5em";
        deleteBtn.style.borderRadius="10px";
        deleteBtn.style.fontFamily="Courier New', Courier, monospace";
        deleteBtn.style.fontWeight=600;
        deleteBtn.style.cursor="pointer";
        deleteBtn.style.outline="none";

        textarea.textContent=text.value;

        deleteBtn.onclick = () =>
        {
            div.style.display="none";
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
            (
                {
                    id:`note_${count}`,
                    note:text.value
                }
            )
        });

        const responseJSON=await response.json();

        console.log(responseJSON);

        text.value="";
        count++;
        
    }
}

  