const connection = require('../../configs/connectDomainDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var Domain = {
    checkDomain: function (domain, callback) {
        return connection.query('select * from daily_domain where domain = ? AND is_deleted = 0', [domain], callback);
    },
    getAllInforDomain: function (callback) {
        return connection.query('select * from daily_domain where is_deleted = 0', callback);
    },
    updateDomain: function ({ id, ...data }, callback) {
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => data[key]);
        return connection.query('update daily_domain set ' + keys_ + ' where id = ?', [...arr, id], callback);
    },
    addDomain: function (data, callback) {
        return connection.query(
            'insert into daily_domain(name, database_name, domain, disabled) value(?,?,?,?)',
            [data.name, data.database_name, data.domain, data.disabled],
            callback,
        );
    },
};
module.exports = Domain;
