const { DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
     const Users = sequelize.define("users", {
          name: {
               type: Sequelize.STRING,
               allowNull: false
          },
          email: {
               type: Sequelize.STRING,
               allowNull: false
          },
          password: {
               type: Sequelize.STRING,
               allowNull: false
          },
          createdAt: {
               type: DataTypes.DATE,
               defaultValue: DataTypes.NOW
          },
          updatedAt: {
               type: DataTypes.DATE,
               defaultValue: DataTypes.NOW
          },
     });
     return Users;
};