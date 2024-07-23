const connection = require('../../configs/connectDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var User = {
    // getAllUser: function (callback) {
    //     return connection.query('Select * from `data_users`', callback);
    // },

    getUserById: function (dbName, data, callback) {
        // console.log(data);
        return connection.query(dbName, 'select * from `data_users` where id=?', [data.id], callback);
    },
    getUserByEmail: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'select * from `data_users` where email=? AND status=1',
            [data.email],
            callback,
        );
    },
    changePass: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'update data_users set pass = ? where email = ?',
            [data.hash, data.email],
            callback,
        );
    },
    getAllUser: function (dbName, callback) {
        // console.log(data);
        return connection.query(dbName, 'select * from `data_users` where status = 1', callback);
    },
    getConfig: function (dbName, callback) {
        return connection.query(dbName, 'Select * from `config`', callback);
    },
    updateConfig: function (dbName, data, callback) {
        // console.log(data);
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
        return connection.query(dbName, 'update config set' + arr, callback);
    },
};
module.exports = User;
