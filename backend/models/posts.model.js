const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
     const posts = sequelize.define("posts", {
          createdBy: {
               type: Sequelize.STRING,
               allowNull: false
          },
          description: {
               type: Sequelize.STRING,
               allowNull: false
          },
          file: {
               type: Sequelize.STRING,
               allowNull: false
          },
          comments: {
               type: Sequelize.STRING,
               allowNull: false,
               get() {
                    return this.getDataValue('comments').split(';')
               },
               set(val) {
                    this.setDataValue('comments', val.join(';'));
               },
          },
          isLiked: {
               type: DataTypes.BOOLEAN
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
     return posts;
};