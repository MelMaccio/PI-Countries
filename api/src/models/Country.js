const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : 'No capital found'
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER,
      get() {
        return this.getDataValue('area') + ' KM2';
      }
    },
    population: {
      type: DataTypes.INTEGER,
      get() {
        return this.getDataValue('population') + ' people';
      }
    }
  },
  {
    timestamps: false
  });
};
