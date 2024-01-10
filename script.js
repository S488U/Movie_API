// API
// https://www.omdbapi.com/?i=tt3896198&apikey=599ded55

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var dataOutput = (document.getElementById("demo").innerHTML = `<p class="animateLoad">Loading</p>`);
    console.log("clicked");
    const inputData = document.getElementById("inputField").value;
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
            var dataOutput = document.getElementById("demo");

            if (data.Response === "True") {
                dataOutput.innerHTML = "";
                for (i = 0; i <= data.Search.length - 1; i++) {
                    dataOutput.innerHTML += 
                    `
                <div class="card mb-3" style="width: 440px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img style="height:200px;" src="${data.Search[i].Poster}" class="img-fluid rounded-start" alt="${inputData} Poster">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title ">${data.Search[i].Title}</h4>
                            <p class="card-text">Type: ${data.Search[i].Type} </p>
                            <p class="card-text"><small class="text-body-secondary">Released: ${data.Search[i].Year}</small></p>
                            <a onclick="link();" data-bs-url="${data.Search[i].imdbID}" class="btn btn-primary">See More</a>
                        </div>
                        </div>
                    </div>
                </div>
                `;
                }
            } else {
                if (data.Response === "False") {
                    dataOutput.innerHTML = data.Error;
                } else {
                    console.log("Status 404 Not Found.");
                }
            }
        })

        .catch((error) => {
            console.error("Fetch Error: ", error);
        });
});


function link() {
    const links = document.querySelectorAll("a");
    links.forEach( (link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            url = link.getAttribute("data-bs-url");
            console.log(url);

            localStorage.setItem("clickedLink", url);

            window.location = "./more.html";
        })
    })
}