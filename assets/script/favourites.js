import { escapeHTML, showNotification } from "./lib.js";

const user = JSON.parse(localStorage.getItem("userInfo"));

const favShow = async (e) => {
    if (e === null || e === "") {
		showNotification("Favourite is corrupted, Clear cache and Data", {
			title: "Error",
			variant: "danger", 
			delay: 2500
		});
    } else {
        const apiUrl = "https://www.omdbapi.com/?i=" + e + "&apikey=599ded55";
        console.log(apiUrl)

        await fetch(apiUrl)
            .then((response => {
                if (!response.ok) {
                    throw new Error(`Error code: ${response.status}`);
                }

                return response.json();
            }))
            .then((data) => {
                if (data.Response === "True") {

                    let createElement = document.createElement('tr');
                    createElement.innerHTML = `
                    <td scope="row"><a href="./more.html" data-bs-url="${e}" class="text-black">${escapeHTML(data.Title)}</a></td>
                    <td>${escapeHTML(data.Year)}</td>
                    <td>${escapeHTML(data.Type)}</td>
                    <td>${escapeHTML(data.imdbRating)}</td>
                `;
                    document.querySelector("tbody").appendChild(createElement);

                    const links = document.querySelectorAll("a[data-bs-url]");
                    links.forEach((link) => {
                        link.addEventListener("click", (event) => {
                            event.preventDefault();
                            const dataCode = link.getAttribute("data-bs-url");
                            localStorage.setItem("clickedLink", dataCode);
                            window.location.href = link.getAttribute("href");
                        });
                    });
                }
            })
            .catch((error) => {
                console.error("Fetch Error: ", error);
            });
    }
}

if (user) {
    let fav = localStorage.getItem("favourite");
    let favModified = fav.split(',');
    let conFav = new Set(favModified);
    let newFav = Array.from(conFav);


    newFav.forEach(async (eachElement) => {
        await favShow(eachElement);
    });
}