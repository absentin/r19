const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const users = []; // Aquí deberías conectar a una base de datos real

app.post('/register', (req, res) => {
    const { username, password, userType } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword, userType });
    res.status(201).send('Usuario registrado');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username, userType: user.userType }, 'secret_key');
        res.json({ token });
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
