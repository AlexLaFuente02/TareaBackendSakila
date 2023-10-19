const express = require('express');
const router = express.Router();
const userService = require('../Service/userService'); // Ajusta la importación según tu estructura de carpetas

// Ruta para crear un nuevo usuario
router.post('/create', async (req, res) => {
  const { username, plainPassword } = req.body;

  try {
    const newUser = await userService.createUser(username, plainPassword);
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

module.exports = router;
