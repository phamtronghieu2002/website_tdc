const Jimp = require('jimp');
var appRoot = require('app-root-path');

async function resize() {
    // Function name is same as of file name
    // Reading Image
    const image = await Jimp.read(appRoot + '/src/public/images/interface/r1.jpg');

    image
        .resize(200, 200, function (err) {
            if (err) throw err;
        })
        .write(appRoot + '/src/public/images/interface/r1rs.jpg');
}

module.exports = resize;
