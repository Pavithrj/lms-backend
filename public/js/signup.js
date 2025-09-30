document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageEl = document.getElementById('message');

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await res.json();

        if (data.success) {
            // if (data.token) localStorage.setItem('token', data.token);

            if (data.token) {
                console.log("Success");
            }

            // window.location.href = '/signup';
        } else {
            messageEl.textContent = data.message || 'Signup failed';
        }
    } catch (err) {
        console.error(err);
        messageEl.textContent = 'Something went wrong';
    }
});
