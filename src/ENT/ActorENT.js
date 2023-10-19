const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const ActorENT = sequelize.define('actor', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 255], // Requerir un mínimo de 3 caracteres y un máximo de 255
        }
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 255],
        }
      },
      birth_date: {
        type: DataTypes.DATE,
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z\s]*$/ // Permitir solo letras y espacios
        }
      },
},
{
  tableName: "actor",
  timestamps: false,
}
);
  
module.exports = ActorENT;