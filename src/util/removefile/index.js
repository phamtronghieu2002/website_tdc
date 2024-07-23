var fs = require('fs');

function removeFile(path_List, id_List, callback) {
    const error = [];
    const success = [];
    let i = path_List.length;

    path_List.forEach((path_, index) => {
        // console.log(path_);
        fs.stat(path_, function (err, stats) {
            fs.unlink(path_, function (err) {
                i--;
                if (err) {
                    error.push(err);
                } else {
                    success.push(id_List[index]);
                }
                if (i <= 0) {
                    return callback(error, success);
                }
            });
        });
    });
}

module.exports = removeFile;
