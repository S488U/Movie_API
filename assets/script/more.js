import { escapeHTML } from "../script/lib.js"

let received;
let area = document.getElementById("dynamicLoad");
area.innerHTML = `<p class="animateLoad">Loading</p>`;

window.addEventListener("DOMContentLoaded", () => {
	received = localStorage.getItem("clickedLink");
	console.log(received);
	if (received) {
		const imdbApi = "https://www.omdbapi.com/?i=" + received + "&apikey=599ded55";
		console.log(imdbApi);

		fetch(imdbApi)
			.then((response) => {
				if (!response.ok) {
					throw new Error(` Error code: ${response.status}`);
				}

				return response.json();
			})

			.then((data) => {
				console.log(data);
				area = document.getElementById("dynamicLoad").innerHTML =
					`
				<div class="row">
					<div class="col-md-6 d-flex flex-column justidy-content-center align-items-center first">
						<img src="${data.Poster}" alt="Movie Poster" class="movie-poster img-fluid">
					</div>
					<div id="data-div" class="col-md-6 second">
						<h2 class="mb-4">${escapeHTML(data.Title)}</h2>
						<p><strong>Language:</strong> ${escapeHTML(data.Language)}</p>
						<p><strong>Rated:</strong> ${escapeHTML(data.Rated)}</p>
						<p><strong>Released:</strong> ${escapeHTML(data.Released)}</p>
						<p><strong>Runtime:</strong> ${escapeHTML(data.Runtime)}</p>
						<p><strong>Genre:</strong> ${escapeHTML(data.Genre)}</p>
						<p><strong>Director:</strong> ${escapeHTML(data.Director)}</p>
						<p><strong>Actors:</strong> ${escapeHTML(data.Actors)}</p>
						<p><strong>Writer:</strong> ${escapeHTML(data.Writer)}</p>
						<p><strong>Plot:</strong> ${escapeHTML(data.Plot)}.</p>
						<p><strong>IMDb Rating:</strong> ${escapeHTML(data.imdbRating)}</p>
						<p><strong>Rotten Tomatoes:</strong> ${data.Ratings[0] ? escapeHTML(data.Ratings[0].Value) : 'N/A'}</p>
						<p><strong>Metacritic:</strong> ${data.Ratings[1] ? escapeHTML(data.Ratings[1].Value) : 'N/A'}</p>
						<p><strong>Awards:</strong> ${escapeHTML(data.Awards)}</p>
						<p><strong>Country:</strong> ${escapeHTML(data.Country)}</p>
						<p><strong>Box Office:</strong> ${escapeHTML(data.BoxOffice)}</p>
						<span class='fav-style' id='favId' style='display:none'>                                                        
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--fav-color)" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
							<path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
							</svg>  
						</span>
					</div>
				</div>
				`;
				// localStorage.removeItem("clickedLink");


				var user = JSON.parse(localStorage.getItem("userInfo"));
				let favId = document.getElementById("favId");

				if (user) {
					favId.style.display = "block";
				}

				favId.addEventListener("click", (event) => {
					event.preventDefault();
					console.log("clicked");

					var getFav = localStorage.getItem("favourite");
					var id = received;
					var fav = getFav ? getFav.split(',') : [];
					fav.push(received);
					console.log(fav);

					localStorage.setItem("favourite", fav.join(','));
				});

			})

			.catch((error) => {
				console.error("Fetch Error: ", error);
			});
	} else {
		console.log("No item received from the Local Storage.");
		area = document.getElementById("dynamicLoad").innerHTML =
			`
			<P>No item received from the Local Storage.</P>
		`;
	}
});