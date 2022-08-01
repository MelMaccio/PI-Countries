const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('activity', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24,
      },
      get() {
        return this.getDataValue('duration') + ' hs';
      }
    },
    season: {
      type: DataTypes.ENUM('summer', 'winter', 'autumn', 'spring'),
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};