const {sequelize }= require('./db'); // đường dẫn đến file db.js
const { Account, Clinic, Book, Comment, Contact } = require('./model/index.js'); // import các model của bạn

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection has been established successfully.');

    await sequelize.sync({ alter: true }); // Hoặc { force: true } nếu muốn xóa và tạo lại bảng
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to sync the database:', error);
  } finally {
    await sequelize.close(); // Đóng kết nối sau khi đồng bộ
  }
}

syncDatabase();
