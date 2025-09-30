document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
            if (data.token) localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            messageEl.textContent = data.message || 'Login failed';
        }
    } catch (err) {
        console.error(err);
        messageEl.textContent = 'Something went wrong';
    }
});
