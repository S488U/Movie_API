let user = JSON.parse(localStorage.getItem("userInfo"));

let cName = document.getElementById("currentName");
let cEmail = document.getElementById("currentEmail");
let cPass = document.getElementById("currentPass");
let dlUser =  document.getElementById("dlUser");

console.log(user);

cName.innerHTML = user.name;
cEmail.innerHTML = user.email;
cPass.innerHTML = user.password;
dlUser.innerHTML = user.name;

const userSubmit = document.getElementById("userSubmit");
userSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    var nUser = document.getElementById("nUser").value;

    if (!nUser) {
        alert("Enter New Username!!");
    } else {
        user.name = nUser;
        cName.innerText = nUser;
        dlUser.innerHTML = nUser;
        pushStorage(user);
        alert("User Name changed Successfully");
    }
});

const emailSubmit = document.getElementById("emailSubmit");
const nEmailInput = document.getElementById("nEmail");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

emailSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    var nEmail = nEmailInput.value;

    if (!nEmail) {
        alert("Enter New E-mail!!");
    } else if (!emailRegex.test(nEmail)) {
        alert("Enter a valid E-mail address!!");
    } else {
        user.email = nEmail;
        cEmail.innerText = nEmail;
        pushStorage(user);
        alert("E-mail changed Successfully");
    }
});

const passSubmit = document.getElementById("passSubmit");
passSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    var nPass = document.getElementById("nPassword").value;

    if (!nPass) {
        alert("Enter New Password!!");
    } else {
        user.password = nPass;
        cPass.innerText = nPass;
        pushStorage(user);
        alert("Password Changed Successfully");
    }
});

function pushStorage(updatedUser) {
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
}


const dltSubmit = document.getElementById("dltSubmit");

dltSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const dlCnfrmUser = document.getElementById("dlCnfrmUser").value;

    if(!dlCnfrmUser) {
        alert("Enter your Username to delete");
    } else {
        if (dlCnfrmUser == user.name ) {
            alert("User Deleted Successfully.");
            localStorage.clear();
            window.location.href = "./login.html";
        } else {
            alert("Enter your current Username!");
        }
    }
})

const showBoxHis = document.getElementById("showBoxHis");

showBoxHis.addEventListener("click", () => {
    var gbHis = localStorage.getItem("histories");
    histories = gbHis.split(',');
    console.log(histories);

    let tableContent = "";
    histories.forEach(savedHistory => {
        tableContent += showEachHistories(savedHistory);
    });

    var showHistories = document.getElementById("showHistories");
    showHistories.style.display = "block";
    showHistories.innerHTML = `
        <table class="table rounded table-striped table-hover border border-dark">
            <thead>
                <tr class="table-dark ">
                    <th scope="col">Histories</th>
                </tr>
            </thead>
            <tbody>
                ${tableContent}
            </tbody>
        </table>
    `;
});

function showEachHistories(e) {
    return `<tr><td scope="row">${e}</td></tr>`;
}
