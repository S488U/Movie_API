
var submit = document.getElementById("submit");

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if( !email || !password ) {
        alert("Please enter the email and password");
    } else {
        var user = {
            name: name,
            email : email,
            password: password
        }
        localStorage.setItem("userInfo", JSON.stringify(user));
        location.reload();
    }
});




