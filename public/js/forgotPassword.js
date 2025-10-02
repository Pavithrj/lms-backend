document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    emailError.textContent = '';

    const email = emailInput.value.trim();

    if (!email) {
        emailError.textContent = "Email is required";
        return;
    }

    try {
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (data.success) {
            alert("Password reset link sent to your email.");
        } else {
            emailError.textContent = data.message || "Something went wrong.";
        }
    } catch (err) {
        console.error(err);
        emailError.textContent = "Server error.";
    }
});
