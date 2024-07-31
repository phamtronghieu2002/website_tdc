const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require('axios');
cloudinary.config({ 
    cloud_name: process.env.DINARY_CLOUD_NAME,
    api_key: process.env.DINARY_CLOUD_API_KEY,
    api_secret: process.env.DINARY_CLOUD_API_SECRET
});



async function convertImageUrlToBase64(imageUrl) {
  try {
    // Tải xuống hình ảnh với kiểu dữ liệu là binary
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    // Chuyển đổi dữ liệu binary thành Base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    
    return base64Image;
  } catch (error) {
    console.error('Lỗi khi tải hình ảnh:', error);
    throw error; // Hoặc xử lý lỗi theo cách khác
  }
}

  
  // Hàm upload ảnh base64 lên Cloudinary
  const uploadBase64Image = async (base64Image, options) => {
    try {
      const result = await cloudinary.uploader.upload(base64Image, {
          folder: 'mobicam', // Tên folder lưu ảnh
      
      
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
module.exports = {
    convertImageUrlToBase64,
    uploadBase64Image
};

