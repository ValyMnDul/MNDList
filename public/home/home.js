

const rateText=document.getElementById("rateText");

const star1=document.getElementById("star1");
const star2=document.getElementById("star2");
const star3=document.getElementById("star3");
const star4=document.getElementById("star4");
const star5=document.getElementById("star5");

let count=10;

function star(rate)
{
    count--;
    if(count >= 0)
    {
        rateText.textContent=`Thanks for ${rate} stars`;

        switch (rate)
        {
            case 1:

                star1.style.color="#dee2e6";

                star2.style.color="black";
                star3.style.color="black";
                star4.style.color="black";
                star5.style.color="black";
                
                break;

            case 2:

                star1.style.color="#dee2e6";
                star2.style.color="#dee2e6";

                star3.style.color="black";
                star4.style.color="black";
                star5.style.color="black";

                break;

            case 3:

                star1.style.color="#dee2e6";
                star2.style.color="#dee2e6";
                star3.style.color="#dee2e6";

                star4.style.color="black";
                star5.style.color="black";

                break;

            case 4:

                star1.style.color="#dee2e6";
                star2.style.color="#dee2e6";
                star3.style.color="#dee2e6";
                star4.style.color="#dee2e6";

                star5.style.color="black";

                break;

            case 5:

                star1.style.color="#dee2e6";
                star2.style.color="#dee2e6";
                star3.style.color="#dee2e6";
                star4.style.color="#dee2e6";
                star5.style.color="#dee2e6"; 
                
                break;
                
            default:

                star1.style.color="red";
                star2.style.color="red";
                star3.style.color="red";
                star4.style.color="red";
                star5.style.color="red"; 

                break;
        } 
    }
    else
    {
        rateText.textContent="Stop man";
    }      
}
