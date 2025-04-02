document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const loginForm = document.getElementById("loginForm");
    const sessionMessage = document.getElementById("sessionMessage");
    const logoutButton = document.getElementById("logout");

    // Function to validate form and store user
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        const user = { name, email, password };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("User registered successfully!");
        displayUsers();
        userForm.reset();
    });

    // Function to display users from localStorage
    function displayUsers() {
        userList.innerHTML = "";
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        users.forEach((user, index) => {
            let li = document.createElement("li");
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    }

    // Handle login functionality
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
        if (user) {
            document.cookie = `user=${user.name}; path=/`;
            sessionMessage.textContent = `Welcome, ${user.name}!`;
            logoutButton.style.display = "block";
        } else {
            alert("Invalid email or password!");
        }
    });

    // Logout functionality
    logoutButton.addEventListener("click", function () {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        sessionMessage.textContent = "";
        logoutButton.style.display = "none";
    });

    // Check session (cookie)
    function checkSession() {
        let cookies = document.cookie.split("; ");
        let userCookie = cookies.find(row => row.startsWith("user="));

        if (userCookie) {
            let userName = userCookie.split("=")[1];
            sessionMessage.textContent = `Welcome back, ${userName}!`;
            logoutButton.style.display = "block";
        }
    }

    displayUsers();
    checkSession();
});
