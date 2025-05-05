const { DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Comment = sequelize.define('Comment', {
  star: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  comment_img: {
    type: DataTypes.TEXT, // sửa từ STRING thành TEXT để lưu base64
    allowNull: true
  },
  idUser: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Account',
      key: 'id'
    }
  }
}, {
  tableName: 'Comment',
  timestamps: true
});

module.exports = Comment;
