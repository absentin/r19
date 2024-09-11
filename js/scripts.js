document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = 'home.html'; // Redirigir a la página adecuada
    } else {
        alert('Credenciales incorrectas');
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, userType })
    });

    if (response.ok) {
        alert('Registro exitoso');
        window.location.href = 'login.html';
    } else {
        alert('Error en el registro');
    }
});
