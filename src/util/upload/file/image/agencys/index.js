const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');
const { v4: uuidv4 } = require('uuid')
// function uploadImage(saveFolder) {
//     const imageFilter = function (req, file, cb) {
//         // Accept images only
//         // console.log(req);
//         if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//             // console.log('originalNAme: ' + file.originalname);
//             req.fileValidationError = 'Only image files are allowed!';
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     };
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, appRoot + saveFolder);
//         },

//         // By default, multer removes file extensions so let's add them back
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//         },
//     });

//     // 'profile_pic' is the name of our file input field in the HTML form
//     let upload = multer({
//         storage: storage,
//         fileFilter: imageFilter,
//     });
//     return upload;
// }
const imageFilter = function (req, file, cb) {
    // Accept images only
    // console.log(req);
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        // console.log('originalNAme: ' + file.originalname);
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/images/agencys');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +  uuidv4() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    // limits: { fileSize: 500 * 500 },
})

const validImgMidleWare = function (req, res, next) {
    // console.log(appRoot + '/src/public/images/logo');
    upload(req, res, function (err) {
        const data = req.body;
        // console.log('ok');
        // if (Number(data.is_logo_change) === 0) {
        //     next();
        //     return;
        // }
        if (req.fileValidationError) {
            return res.status(200).json({
                status: 2,
            });
        } else if (!req.file) {
            return res.status(200).json({
                status: 3,
            });
        } else if (err instanceof multer.MulterError) {
            return res.status(200).json({
                status: 4,
            });
        } else if (err) {
            return res.status(200).json({
                status: 5,
            });
        }
        next();
    });
};

module.exports = validImgMidleWare;
module.exports = upload;