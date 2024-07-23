const fs = require('fs');
const path = require('path');
const relativeDirectoryPath = 'src/public/images/agencys';
const agencys_img_folder = path.join(process.cwd(), relativeDirectoryPath);




const tools = {
    removeAccents: function (str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replaceAll('(', '-')
            .replaceAll(')', '-')
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .replaceAll('?', '-');
    },
    getImagesFromDirectory:function(directoryPath) {
        return new Promise((resolve, reject) => {
          fs.readdir(directoryPath, (err, files) => {
            if (err) {
              return reject(err);
            }
            // Lọc ra chỉ các tệp ảnh (ví dụ: .jpg, .png)
            const imageFiles = files.filter(file => {
              const ext = path.extname(file).toLowerCase();
              return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
            });
            resolve(imageFiles.map(img=>`/static/images/agencys/${img}`));
          });
        });
      },
      deleteImagesFromDirectory: function(directoryPath) {
        return new Promise((resolve, reject) => {
          fs.readdir(directoryPath, (err, files) => {
            if (err) {
              return reject(err);
            }
            // Lọc ra chỉ các tệp ảnh (ví dụ: .jpg, .png)
            const imageFiles = files.filter(file => {
              const ext = path.extname(file).toLowerCase();
              return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
            });
      
            // Xóa từng tệp ảnh
            imageFiles.forEach(file => {
              const filePath = path.join(directoryPath, file);
              fs.unlink(filePath, err => {
                if (err) {
                  console.error(`Lỗi khi xóa tệp: ${filePath}`, err);
                }
              });
            });
      
            resolve(); // Hoàn thành xóa các tệp ảnh
          });
        });
      },
      agencys_img_folder,
};

module.exports = tools;
