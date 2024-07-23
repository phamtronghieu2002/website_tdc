const connection = require('../../configs/connectDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var Order = {
    add: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'INSERT into orders(products, fullname, email, phone_number, address, note, total_money) value (?,?,?,?,?,?,?)',
            [data.products, data.fullname, data.email, data.phone_number, data.address, data.note, data.total_money],
            callback,
        );
    },
    contactEvent: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'INSERT into oppenning_event(name, phone, uNum, vehicle) value (?,?,?,?)',
            [data.name, data.phone, data.uNum, data.vehicle],
            callback,
        );
    },
    addContact: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'INSERT into contact_me(name, phone, content) value (?,?,?)',
            [data.full_name, data.phone_number, data.content],
            callback,
        );
    },
    allOrder: function (dbName, callback) {
        return connection.query(
            dbName,
            'SELECT * FROM order_details join orders on orders.id = order_details.order_id',
            callback,
        );
    },
    getAllContact: function (dbName, callback) {
        return connection.query(dbName, 'SELECT * FROM contact_me', callback);
    },
    getAllContactEvent: function (dbName, callback) {
        return connection.query(dbName, 'SELECT * FROM oppenning_event', callback);
    },
    getAllOrder: function (dbName, callback) {
        return connection.query(dbName, 'SELECT * FROM orders; SELECT * from product', callback);
    },
    filter: function (dbName, data, callback) {
        // console.log(data);
        // const orderCodeList = data.order_code.split(',');
        const minDate = new Date('00:00:01 ' + data.minDate);
        const maxDate = new Date('23:59:59 ' + data.maxDate);

        let status = data.order_status != 5 ? 'AND status = ' + data.order_status + ' ' : '';
        let orderCodeList = data.order_code !== 'null' ? `AND id in (${data.order_code.split(',')}) ` : '';

        return connection.query(
            dbName,
            'Select * from `orders` WHERE order_date < ? AND order_date > ? AND total_money < ? AND  total_money > ? ' +
                status +
                orderCodeList +
                ';' +
                'SELECT * from product',
            [maxDate, minDate, data.maxOV, data.minOV],
            callback,
        );
    },
    update: function (dbName, data, callback) {
        return connection.query(dbName, 'update orders set status = ? where id = ?', [data.status, data.id], callback);
    },
};
module.exports = Order;
