const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

const UserDetail = sequelize.define('userDetail', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, //  userId is required
  },
  fullName: DataTypes.STRING,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  postalCode: DataTypes.STRING,
});

module.exports = UserDetail;
// here i am defining userid as foreign key and the relationshiip. so dont have to do it using belongsto or haveMany. but when there is complex DB , then better to keep associations diffrent so maintaining & testing association can be easy
