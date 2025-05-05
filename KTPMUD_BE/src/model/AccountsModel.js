const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

// Định nghĩa model
const Account = sequelize.define('Account', {
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.TEXT, // sửa từ STRING thành TEXT để lưu base64
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Account',
  timestamps: false
});

module.exports = Account;
