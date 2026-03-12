// API
// https://www.omdbapi.com/?i=tt3896198&apikey=599ded55
import { escapeHTML, showNotification } from "./lib.js";

const submitBtn = document.getElementById("submitBtn");
const xssRegex = /(<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+\s*=|<\s*iframe|<\s*img\s+[^>]*on\w+\s*=|<\s*svg[^>]*>|<\s*link[^>]*>|<\s*body[^>]*>|<\s*embed[^>]*>|<\s*object[^>]*>)/i;

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const inputData = document.getElementById("inputField").value.trim();

    if (xssRegex.test(inputData)) {
        console.log("XSS Detected!");
        document.getElementById("inputField").value = "";
        document.getElementById("demo").innerText = "XSS Detected!";
        return;
    }
    
    document.getElementById("inputField").value = inputData;

    saveHistory(inputData);

    if (inputData === null || inputData === "") {
		showNotification("Invalid Input", {
			title: "Warning",
			variant: "warning", 
			delay: 2500
		});
    } else {
        // const dataOutput = (document.getElementById("demo").innerHTML = `<p class="animateLoad">Loading</p>`);
        console.log("clicked");

        const apiUrl = "https://www.omdbapi.com/?s=" + inputData + "&apikey=599ded55";

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error code: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                let dataOutput = document.getElementById("demo");

                if (data.Response === "True") {
                    dataOutput.innerHTML = "";
                    for (let i = 0; i <= data.Search.length - 1; i++) {
                        dataOutput.innerHTML +=
                            `
                            <div class="card mb-3 movie-container">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                    <img style="height:200px; object-fit:cover; width:100%; object-position: top;" src="${data.Search[i].Poster}" class="img-fluid rounded-start poster" alt="${escapeHTML(inputData)} Poster">
                                    </div>
                                    <div class="col-md-8">
                                    <div class="card-body d-flex flex-column">
                                        <h4 class="card-title ">${escapeHTML(data.Search[i].Title)}</h4>
                                        <p class="card-text">Type: ${escapeHTML(data.Search[i].Type)} </p>
                                        <p class="card-text"><small class="text-body-secondary">Released: ${escapeHTML(data.Search[i].Year)}</small></p>
                                        <a href="./assets/pages/more.html" data-bs-url="${data.Search[i].imdbID}" class="btn btn-primary">See More</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `;
                    }

                    const links = document.querySelectorAll("a[data-bs-url]");
                    links.forEach((link) => {
                        link.addEventListener("click", (event) => {
                            event.preventDefault();
                            const url = link.getAttribute("data-bs-url");
                            console.log(url);
                            localStorage.setItem("clickedLink", url);
                            window.location.href = link.getAttribute("href");
                        });
                    });
                } else {
                    if (data.Response === "False") {
                        dataOutput.innerHTML = escapeHTML(data.Error);
                    } else {
                        console.log("Status 404 Not Found.");
                    }
                }
            })
            .catch((error) => {
                console.error("Fetch Error: ", error);
            });
    }
});


const saveHistory = (item) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
        const gethis = localStorage.getItem("histories");
        const his = gethis ? gethis.split(',') : [];
        his.push(item);
        console.log(his);

        localStorage.setItem("histories", his.join(','));
    } else {
        console.log("Not Logged in");
    }

}
