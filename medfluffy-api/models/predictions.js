'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class predictions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  predictions.init({
    img_url: DataTypes.TEXT,
    result: DataTypes.STRING,
    accuration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'predictions',
  });
  return predictions;
};