'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      result_detail.hasOne(predictions, {
        as: 'rslt2pred',
        foreignKey: 'id_result'
      });
      result_detail.belongsTo(image_detail, {
        as: 'rslt2img',
        foreignKey: 'id'
      });
      // define association here
    }
  }
  result_detail.init({
    id_img: DataTypes.INTEGER,
    result_name: DataTypes.STRING,
    accuration: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'result_detail',
  });
  return result_detail;
};