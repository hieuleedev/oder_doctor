const { DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Contact = sequelize.define('Contact', {
  fullname: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  text: {
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
  tableName: 'Contact',
  timestamps: false
});

module.exports =Contact;
