const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db'); // Asegúrate de ajustar la importación a la ubicación correcta de tu archivo de conexión a la base de datos

const UserENT = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = UserENT;
