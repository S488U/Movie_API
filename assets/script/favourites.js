
var user = JSON.parse(localStorage.getItem("userInfo"));

if(user) {
    var fav = localStorage.getItem("favourite");
    favModified = fav.split(',');

    var element = favModified;
    var conFav = new Set(element);
    var newFav = Array.from(conFav);


    newFav.forEach(eachElement => {
        favShow(eachElement);
    });
}

function favShow(e) {
    if(e === null || e === "") {
        alert("Favourite is corrupted, Clear cache and Data");
    } else {
        const apiUrl = "https://www.omdbapi.com/?i=" + e + "&apikey=599ded55";
        console.log(apiUrl)

        fetch(apiUrl) 
        .then((response => {
            if(!response.ok) {
                throw new Error(`Error code: ${response.status}`);
            }

            return response.json();
        }))

        .then((data) => {
            if (data.Response === "True") {

                var createElement = document.createElement('tr');
                createElement.innerHTML = `
                    <td scope="row">${data.Title}</td>
                    <td>${data.Year}</td>
                    <td>${data.Type}</td>
                    <td>${data.imdbRating}</td>
                `;
        
                document.querySelector("tbody").appendChild(createElement);
            }
        })
        

        .catch((error) => {
            console.error("Fetch Error: ", error);
        });
    } 
}
