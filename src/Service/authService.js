const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../ENT/UserENT');
const LoginDTO = require('../DTO/LoginDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const { Strategy: LocalStrategy } = require('passport-local'); // Importa LocalStrategy desde passport-local

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      let response;
      if (!user) {
        response = new ResponseDTO('AUTH-1001', null, 'Usuario no encontrado');
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
          response = new ResponseDTO('AUTH-1002', null, 'Contraseña incorrecta');
        } else {
          const loginDTO = new LoginDTO(user.id, user.username);
          response = new ResponseDTO('AUTH-0000', loginDTO, 'Inicio de sesión exitoso');
        }
      }

      return done(null, user, response);
    } catch (error) {
      const response = new ResponseDTO('AUTH-1003', null, 'Error en la autenticación: ' + error);
      return done(error, false, response);
    }
  }
));


//AUTENTICACION:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json(new ResponseDTO('AUTH-0001', null, 'Usuario no autenticado'));
}

module.exports = { passport, isAuthenticated };
