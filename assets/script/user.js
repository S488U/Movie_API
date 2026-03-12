import { escapeHTML, showNotification } from "./lib.js";

let user = JSON.parse(localStorage.getItem("userInfo"));

let cName = document.getElementById("currentName");
let cEmail = document.getElementById("currentEmail");
let cPass = document.getElementById("currentPass");
let dlUser =  document.getElementById("dlUser");

console.log(user);

cName.innerHTML = escapeHTML(user.name);
cEmail.innerHTML = escapeHTML(user.email);
cPass.innerHTML = escapeHTML(user.password);
dlUser.innerHTML = escapeHTML(user.name);

const userSubmit = document.getElementById("userSubmit");
userSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const nUser = document.getElementById("nUser").value;

    if (!nUser) {
		showNotification("Enter New Username!!", {
			title: "Warning",
			variant: "warning",
			delay: 2500
		});
    } else {
        user.name = nUser;
        cName.innerText = nUser;
        dlUser.innerHTML = escapeHTML(nUser);
        pushStorage(user);
		showNotification("User Name Changed Succesfully", {
			title: "Saved",
			variant: "success", 
			delay: 2500
		});
    }
});

const emailSubmit = document.getElementById("emailSubmit");
const nEmailInput = document.getElementById("nEmail");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

emailSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const nEmail = nEmailInput.value;

    if (!nEmail) {
		showNotification("Enter New E-mail!!", {
			title: "Warning",
			variant: "warning",
			delay: 2500
		});
    } else if (!emailRegex.test(nEmail)) {
		showNotification("Enter a valid E-mail address!!", {
			title: "Warning",
			variant: "warning",
			delay: 2500
		});
    } else {
        user.email = nEmail;
        cEmail.innerText = nEmail;
        pushStorage(user);
		showNotification("E-mail changed succesfully", {
			title: "Saved",
			variant: "success", 
			delay: 2500
		});
    }
});

const passSubmit = document.getElementById("passSubmit");
passSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const nPass = document.getElementById("nPassword").value;

    if (!nPass) {
		showNotification("Enter New Password!!", {
			title: "Warning",
			variant: "warning", 
			delay: 2500
		});
    } else {
        user.password = nPass;
        cPass.innerText = nPass;
        pushStorage(user);
		showNotification("Password Changed Successfully", {
			title: "Saved",
			variant: "success", 
			delay: 2500
		});
    }
});

const pushStorage = (updatedUser)  => {
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
}


const dltSubmit = document.getElementById("dltSubmit");

dltSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const dlCnfrmUser = document.getElementById("dlCnfrmUser").value;

    if(!dlCnfrmUser) {
		showNotification("Enter your Username to delete", {
			title: "Warning",
			variant: "warning",
			delay: 2500
		});
    } else {
        if (dlCnfrmUser == user.name ) {
			showNotification("User Deleted Succesfully", {
				title: "Saved",
				variant: "success", 
				delay: 2500
			});
            localStorage.clear();
            window.location.href = "./login.html";
        } else {
			showNotification("Enter your current Username!", {
				title: "Warning",
				variant: "warning",
				delay: 2500
			});
        }
    }
})

const showBoxHis = document.getElementById("showBoxHis");

showBoxHis.addEventListener("click", () => {
    const gbHis = localStorage.getItem("histories");
    const histories = gbHis.split(',');
    console.log(histories);

    let tableContent = "";
    histories.forEach(savedHistory => {
        tableContent += showEachHistories(savedHistory);
    });

    const showHistories = document.getElementById("showHistories");
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

const showEachHistories = (historyItem) => {
    return `<tr><td scope="row">${escapeHTML(historyItem)}</td></tr>`;
}
