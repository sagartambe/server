'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropCycleField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CropCycleField.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'CropCycleField',
  });
  CropCycleField.associate = models => {
    CropCycleField.belongsTo(models.CropCycle, {
      foreignKey: 'cropCycleId'
    });
  }
  CropCycleField.associate = models => {
    CropCycleField.belongsTo(models.Field, {
      foreignKey: 'fieldId'
    });
  }
  return CropCycleField;
};