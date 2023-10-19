const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const actorAPI = require('./API/actorAPI');
const authAPI = require('./API/authAPI');
const userAPI = require('./API/userAPI');
const passport = require('passport');
const session = require('express-session');
const { isAuthenticated } = require('./Service/authService'); // Importa el middleware isAuthenticated

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Configuración de Passport
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/actor', isAuthenticated, actorAPI); // Protege el endpoint '/actor' utilizando el middleware isAuthenticated
app.use('/auth', authAPI);
app.use('/user', userAPI);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido al API REST de SAKILA!');
});

// Escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
