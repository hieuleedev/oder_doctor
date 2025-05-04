// src/config/db.config.js
const { Sequelize } = require('sequelize');

//import User from '../models/user/user.model.js';

const sequelize = new Sequelize("order_doctor", "root", "060401", {
    host: "localhost",
    port: 3306, 
    dialect: 'mysql',
    timezone: '+07:00', // Múi giờ Việt Nam
    logging: false,
});

// Kết nối cơ sở dữ liệu
const connectDB = async () => {
    try {
      //  console.log("🔍 Trying to connect DB:", process.env.DB_NAME);
        await sequelize.authenticate();
        console.log('✅ Kết nối cơ sở dữ liệu thành công!');
    } catch (error) {
        console.error('❌ Lỗi kết nối cơ sở dữ liệu:');

        if (error.name === 'SequelizeAccessDeniedError') {
            console.error('→ Sai username/password hoặc user không có quyền.');
        } else if (error.name === 'SequelizeHostNotFoundError') {
            console.error('→ Host DB không tìm thấy.');
        } else if (error.name === 'SequelizeConnectionRefusedError') {
            console.error('→ Không thể kết nối tới DB (Connection refused).');
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('→ Database không tồn tại.');
        } else {
            console.error(error);
        }
    }
};

// Export theo chuẩn ES Modules
module.exports = {
    connectDB,
    sequelize
};
