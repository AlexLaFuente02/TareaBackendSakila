const bcrypt = require('bcrypt');
const UserENT = require('../ENT/UserENT');

const createUser = async (username, plainPassword) => {
  try {
    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Crea un nuevo usuario en la base de datos con la contraseña hasheada
    const newUser = await UserENT.create({
      username: username,
      hashedPassword: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

module.exports = { createUser };
