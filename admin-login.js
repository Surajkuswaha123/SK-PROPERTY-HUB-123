const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (
        email === "admin@skpropertyhub.com" &&
        password === "123456"
    ) {

        localStorage.setItem(
            "isAdminLoggedIn",
            "true"
        );

        alert("Login Successful ✅");

        window.location.href = "admin.html";

    } else {

        alert(
            "Invalid Email or Password ❌"
        );

    }

});