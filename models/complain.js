'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  complain.init({
    userid: DataTypes.INTEGER,
    matter: DataTypes.STRING,
    complain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'complains',
  });
  return complain;
};

