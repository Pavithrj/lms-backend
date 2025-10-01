document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('message').textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let valid = true;

    if (!name) {
        document.getElementById('nameError').textContent = 'Full name is required';
        valid = false;
    }

    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        valid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Enter a valid email';
            valid = false;
        }
    }

    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        valid = false;
    }

    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Confirm your password';
        valid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        valid = false;
    }

    if (!valid) return;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await res.json();

        if (data.success) {
            if (data.token) localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            if (data.field === 'name') document.getElementById('nameError').textContent = data.message;
            else if (data.field === 'email') document.getElementById('emailError').textContent = data.message;
            else if (data.field === 'password') document.getElementById('passwordError').textContent = data.message;
            else document.getElementById('message').textContent = data.message || 'Signup failed';
        }
    } catch (err) {
        console.error(err);
        document.getElementById('message').textContent = 'Something went wrong';
    }
});

document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
});

document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
    const confirmInput = document.getElementById('confirmPassword');
    const toggleBtn = document.getElementById('toggleConfirmPassword');
    if (confirmInput.type === 'password') {
        confirmInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        confirmInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
});
