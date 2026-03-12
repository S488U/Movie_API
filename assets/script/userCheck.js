
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
        let userDisplay = document.querySelectorAll(".userShow");
        let userLogin = document.querySelectorAll(".user-login");

        if (userDisplay.length > 0) {
            userDisplay.forEach(userElement => {
                userElement.innerText = user.name || "No Name"; 
            });
        } else {
            console.log("No elements with the 'userShow' class found.");
        }

        if(userLogin.length > 0) {
            userLogin.forEach(userLog => {
                userLog.style.display = "none";
            })
        }
    } else {
        console.log("No user information found in localStorage.");
    }
});
