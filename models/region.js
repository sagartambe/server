'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Region.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'Region',
  });
  Region.associate = models => {
    Region.belongsTo(models.Property, {
      foreignKey: 'propertyId'
    });
    Region.hasMany(models.Field, {
      foreignKey: 'regionId'
    });
  }
  return Region;
};