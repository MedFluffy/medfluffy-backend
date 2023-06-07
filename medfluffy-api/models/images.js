'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    static associate(models) {
      images.hasMany(models.predictions, {
        as: 'img2pred',
        foreignKey: 'id_img'
      });
      images.hasMany(models.results, {
        as: 'img2rslt',
        foreignKey: 'id_img'
      });
    }
  }
  images.init({
    img_url: DataTypes.TEXT,
    size_kb: DataTypes.INTEGER,
    extension_file: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('uploaded','predicted','unknown')
  }, {
    sequelize,
    modelName: 'images',
  });
  return images;
};