'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Property.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'Property',
  });
  Property.associate = models => {
  }
  Property.associate = models => {
    Property.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    });
    Property.hasMany(models.Region, {
      foreignKey: 'propertyId'
    });
  }
  return Property;
};