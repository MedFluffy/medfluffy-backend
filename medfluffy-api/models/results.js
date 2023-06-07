'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class results extends Model {
    static associate(models) {
      // define association here
      results.hasMany(models.predictions, {
        as: 'rslt2pred',
        foreignKey: 'id_result'
      });
      results.belongsTo(models.images, {
        as: 'rslt2img',
        foreignKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET DEFAULT'
      });
    }
  }
  results.init({
    id_img: DataTypes.INTEGER,
    result_name: DataTypes.STRING,
    accuration: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'results',
  });
  return results;
};