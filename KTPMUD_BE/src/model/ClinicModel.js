const { DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');// file này chứa kết nối Sequelize

const Clinic = sequelize.define('Clinic', {
  name: {
    type: DataTypes.STRING
  },
  phonenumber: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'clinic',
  timestamps: false
});

module.exports = Clinic;
