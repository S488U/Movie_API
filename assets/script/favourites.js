
let user = JSON.parse(localStorage.getItem("userInfo"));

if (user) {
    let fav = localStorage.getItem("favourite");
    let favModified = fav.split(',');
    let conFav = new Set(favModified);
    let newFav = Array.from(conFav);


    newFav.forEach(async eachElement => {
        await favShow(eachElement);
    });
}

async function favShow(e) {
    if (e === null || e === "") {
        alert("Favourite is corrupted, Clear cache and Data");
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
                    <td scope="row"><a href="./more.html" data-bs-url="${e}" class="text-black">${data.Title}</a></td>
                    <td>${data.Year}</td>
                    <td>${data.Type}</td>
                    <td>${data.imdbRating}</td>
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
