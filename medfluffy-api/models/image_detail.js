'use strict';
const {
  Model
} = require('sequelize');
const predictions = require('./predictions');
const result_detail = require('./result_detail');
module.exports = (sequelize, DataTypes) => {
  class image_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      image_detail.hasOne(predictions, {
        as: 'img2pred',
        foreignKey: 'id_img'
      });
      image_detail.hasOne(result_detail, {
        as: 'img2rslt',
        foreignKey: 'id_img'
      });
      // define association here
    }
  }
  image_detail.init({
    img_url: DataTypes.STRING,
    size_in_kb: DataTypes.INTEGER,
    extension_file: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM()
  }, {
    sequelize,
    modelName: 'image_detail',
  });
  return image_detail;
};