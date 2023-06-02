'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image_detail.init({
    img_url: DataTypes.STRING,
    img_size: DataTypes.STRING,
    extensiom_file: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image_detail',
  });
  return image_detail;
};