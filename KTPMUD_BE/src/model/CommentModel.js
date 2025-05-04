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
    type: DataTypes.STRING
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
  timestamps: false
});

module.exports = Comment;
