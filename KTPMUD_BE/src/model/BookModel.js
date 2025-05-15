const { DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Book = sequelize.define('Book', {
  typeTime: {
    type: DataTypes.STRING
  },
  dayTime: {
    type: DataTypes.STRING
  },
  idUser: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Account',
      key: 'id'
    }
  },
  idClinic: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clinic',
      key: 'id'
    }
  }

}, {
  tableName: 'book',
  timestamps: true
});

module.exports = Book;
