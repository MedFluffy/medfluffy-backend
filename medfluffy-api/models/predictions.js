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
      predictions.belongsTo(image_detail, {
        as: 'pred2img',
        foreignKey: 'id'
      });
      predictions.belongsTo(result_detail, {
        as: 'pred2rslt',
        foreignKey: 'id'
      });

    }
  }
  predictions.init({
    id_user: DataTypes.STRING,
    id_img: DataTypes.INTEGER,
    id_result: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'predictions',
  });
  return predictions;
};