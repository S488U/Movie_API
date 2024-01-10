// API
// https://www.omdbapi.com/?i=tt3896198&apikey=599ded55

function handleSize() {
    const navbtn = document.getElementById("navbtntoggle");
    const desktopNav = document.documentElement.querySelector(".nav");

    const winSize = window.innerWidth;
    
    if(winSize <= 700) {
        navbtn.style.display = "flex";
        desktopNav.style.display = "none";
    } else {
        navbtn.style.display = "none";
        desktopNav.style.display = "flex";
    }
}

handleSize();

window.addEventListener("resize", handleSize);

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function () {
    event.preventDefault();
    console.log("clicked");
    const inputData = document.getElementById("inputField").value;
    const apiUrl = "https://www.omdbapi.com/?s=" + inputData + "&apikey=599ded55";

    fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Error code: ${response.status}`)
            }

            return response.json();
        })

        .then(data => {
            console.log(data);
            var dataOutput = document.getElementById("demo");
            
            if(data.Response === 'True') {
                for(i=0; i<= data.Search.length - 1; i++){
                    dataOutput.innerHTML += 
                `   <p>Title: ${data.Search[i].Title} </p> <br> 
                <p>Type: ${data.Search[i].Type} </p> <br> 
                <p>Released Year: ${data.Search[i].Year} </p> <br> 
                 <img src="${data.Search[i].Poster}" alt="${inputData} Poster"> <br> 
                
                `;
                }

                // dataOutput.innerHTML = 
                // `   <p>Title: ${data.Search[0].Title} </p> <br> 
                // <p>Type: ${data.Search[0].Type} </p> <br> 
                // <p>Released Year: ${data.Search[0].Year} </p> <br> 
                //  <img src="${data.Search[0].Poster}" alt="${inputData} Poster"> <br> 
                
                // `;
            } else {
                dataOutput.innerHTML = `"${inputData}" Not Found in the server.`;
            }
        }) 

        .catch(error => {
            console.error("Fetch Error: ", error);
        })
})
