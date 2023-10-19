const express = require('express');
const { passport, isAuthenticated } = require('../Service/authService'); // Importa la instancia de passport y el middleware isAuthenticated

const LoginDTO = require('../DTO/LoginDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, response) => {
    if (err || !user) {
      const status = err ? 500 : 401;
      return res.status(status).json(response);
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json(response);
      }

      const loginDTO = response.result;
      res.status(200).json(new ResponseDTO('AUTH-0000', loginDTO, 'Inicio de sesión exitoso'));
    });
  })(req, res, next);
});

// Ruta para cerrar sesión
router.get('/logout', isAuthenticated, (req, res) => {
  req.logout(function (err) {
    if (err) {
      // Manejo de errores si es necesario
      return res.status(500).json(new ResponseDTO('AUTH-1004', null, 'Error al cerrar sesión'));
    }
    res.status(200).json(new ResponseDTO('AUTH-0003', null, 'Cierre de sesión exitoso'));
  });
});
// Ruta para verificar el estado de autenticación
router.get('/status', isAuthenticated, (req, res) => { // Protege esta ruta utilizando el middleware isAuthenticated
  if (req.isAuthenticated()) {
    const userDTO = new LoginDTO(req.user.id, req.user.username);
    res.status(200).json(new ResponseDTO('AUTH-0000', userDTO, 'Usuario autenticado'));
  } else {
    res.status(200).json(new ResponseDTO('AUTH-0001', null, 'Usuario no autenticado'));
  }
});

module.exports = router;
