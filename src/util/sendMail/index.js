const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phamhieuproaz@gmail.com',
    pass: 'dues bgeu fhlh iecc'  // Lưu ý: Không nên để mật khẩu ở đây trong mã nguồn công khai.
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: path.join(__dirname),  // Không sử dụng layout, bạn có thể bỏ qua nếu không cần
    defaultLayout: false,
  },
  viewPath: path.join(__dirname),  // Đường dẫn đến thư mục chứa template
  extName: '.hbs'
}));

module.exports = transporter;
