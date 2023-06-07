'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class predictions extends Model {
    static associate(models) {
      // define association here
      predictions.belongsTo(models.images, {
        as: 'pred2img',
        foreignKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET DEFAULT'
      });
      predictions.belongsTo(models.results, {
        as: 'pred2rslt',
        foreignKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET DEFAULT'
      });
    }
  }
  predictions.init({
    id_user: DataTypes.INTEGER,
    id_img: DataTypes.INTEGER,
    id_result: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'predictions',
  });
  return predictions;
};