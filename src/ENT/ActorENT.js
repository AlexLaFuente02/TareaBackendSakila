const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const ActorENT = sequelize.define('actor', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
},
{
  tableName: "actor",
  timestamps: false,
}
);
  
module.exports = ActorENT;