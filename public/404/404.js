const button=document.getElementById("button");
let count=0;
function clickB()
{
    if(count > 998)
    {
        count=0;
    }
    count++;
    button.innerHTML=`${count}`;
}
