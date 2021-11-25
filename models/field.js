'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Field.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    specification: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Field',
  });
  Field.associate = models => {
    Field.belongsTo(models.Region, {
      foreignKey: 'regionId'
    });
  }
  Field.associate = models => {
    Field.hasMany(models.CropCycleField, {
      foreignKey: 'fieldId'
    });
  }
  return Field;
};