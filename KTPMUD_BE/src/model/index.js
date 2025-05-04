const Account = require('./AccountsModel.js');
const Book = require('./BookModel.js');
const Clinic = require('./ClinicModel.js');
const Comment = require('./CommentModel.js');
const Contact = require('./ContactModel.js');

// Định nghĩa các quan hệ sau khi models đã được import
Book.belongsTo(Account, { foreignKey: 'idUser' });
Book.belongsTo(Clinic, { foreignKey: 'idClinic' });

Account.hasMany(Book, { foreignKey: 'idUser' });

Comment.belongsTo(Account, { foreignKey: 'idUser' });
Account.hasMany(Comment, { foreignKey: 'idUser' });

Contact.belongsTo(Account, { foreignKey: 'idUser' });
Account.hasMany(Contact, { foreignKey: 'idUser' });

Clinic.hasMany(Book, { foreignKey: 'idClinic' });
Clinic.belongsTo(Account, { foreignKey: 'idDoctor' });

module.exports = {
  Account,
  Book,
  Clinic,
  Comment,
  Contact
};
