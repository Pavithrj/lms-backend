document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let valid = true;

    if (!email) {
        document.getElementById("emailError").textContent = "Email is required";
        valid = false;
    }

    if (!password) {
        document.getElementById("passwordError").textContent = "Password is required";
        valid = false;
    }

    if (!valid) return;

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });


        const data = await res.json();

        if (data.success) {
            if (data.token) localStorage.setItem("token", data.token);
            // window.location.href = "/";
        } else {
            if (data.field === "email") {
                document.getElementById("emailError").textContent = data.message;
            } else if (data.field === "password") {
                document.getElementById("passwordError").textContent = data.message;
            } else {
                document.getElementById("passwordError").textContent = data.message;
            }
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});

document.getElementById("togglePassword").addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleBtn.textContent = "👁️";
    }
});
