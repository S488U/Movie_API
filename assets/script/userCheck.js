
document.addEventListener("DOMContentLoaded", () => {
    var user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
        var userDisplay = document.querySelectorAll(".userShow");

        if (userDisplay.length > 0) {
            userDisplay.forEach(userElement => {
                userElement.innerHTML = user.name || "No Name"; 
            });
        } else {
            console.log("No elements with the 'userShow' class found.");
        }
    } else {
        console.log("No user information found in localStorage.");
    }
});
