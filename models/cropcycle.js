'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropCycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CropCycle.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'CropCycle',
  });
  CropCycle.associate = models => {
    CropCycle.belongsTo(models.Crop, {
      foreignKey: 'cropId'
    });
  }
  CropCycle.associate = models => {
    CropCycle.hasMany(models.CropCycleField, {
      foreignKey: 'cropCycleId'
    });
  }
  return CropCycle;
};