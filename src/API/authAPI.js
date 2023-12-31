const express = require('express');
const { passport, isAuthenticated } = require('../Service/authService'); // Importa la instancia de passport y el middleware isAuthenticated

const LoginDTO = require('../DTO/LoginDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Iniciar sesión
 *     description: Inicia sesión de usuario con las credenciales proporcionadas.
 *     requestBody:
 *       description: Credenciales de inicio de sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: nuevoUsuario
 *               password:
 *                 type: string
 *                 example: miContraseñaSegura
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: login
 *                 code:
 *                   type: string
 *                   example: AUTH-0000
 *                 result:
 *                   $ref: "#/components/schemas/LoginDTO"
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *       5XX:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: login
 *                 code:
 *                   type: string
 *                   example: AUTH-1001
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 */

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

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario actualmente autenticado.
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: logout
 *                 code:
 *                   type: string
 *                   example: AUTH-0003
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Cierre de sesión exitoso
 *       5XX:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: logout
 *                 code:
 *                   type: string
 *                   example: AUTH-1004
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Error al cerrar sesión
 */

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

/**
 * @openapi
 * /auth/status:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verificar estado de autenticación
 *     description: Verifica si el usuario está autenticado y devuelve información del usuario.
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: status
 *                 code:
 *                   type: string
 *                   example: AUTH-0000
 *                 result:
 *                   $ref: "#/components/schemas/LoginDTO"
 *                 message:
 *                   type: string
 *                   example: Usuario autenticado
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: status
 *                 code:
 *                   type: string
 *                   example: AUTH-0001
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Usuario no autenticado
 */

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
