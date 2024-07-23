const connection = require('../../configs/connectDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var Product = {
    update: function (dbName, { id, ...data }, callback) {
        // console.log(data);
        if (data.product_images) {
            data.thumbnail = data.product_images.split('*')[0];
            // data.product_images = data.product_images.split('*').splice(0, 1).join('*');

            data.product_images = data.product_images.split('*');
            data.product_images.shift();
            data.product_images = data.product_images.join('*');
        }

        // console.log(data.product_images);
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => data[key]);
        return connection.query(dbName, 'update product set ' + keys_ + ' where id = ?', [...arr, id], callback);
    },
    add: function (dbName, data, callback) {
        // console.log(data);

        data.thumbnail = data.product_images.split('*')[0];
        if (data.product_images) {
            data.thumbnail = data.product_images.split('*')[0];
            // data.product_images = data.product_images.split('*').splice(0, 1).join('*');

            data.product_images = data.product_images.split('*');
            data.product_images.shift();
            data.product_images = data.product_images.join('*');
        }
        return connection.query(
            dbName,
            'insert into product(title,slug,product_code,category_id,price,discount,thumbnail,product_images,inventory_num,description,description_all,hidden) value(?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                data.title,
                data.slug,
                data.product_code,
                data.category_id,
                data.price,
                data.discount,
                data.thumbnail,
                data.product_images,
                data.inventory_num,
                data.description,
                data.description_all,
                data.hidden,
            ],
            callback,
        );
    },
    addCategory: function (dbName, data, callback) {
        console.log(data);
        return connection.query(dbName, 'insert into category(name) value(?)', [data.name], callback);
    },

    updateCategory: function (dbName, { id, ...data }, callback) {
        const keys = Object.keys(data);
        const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
        // console.log(arr);
        if (data.is_deleted == 1) {
            return connection.query(
                dbName,
                'update category set ' + arr + ' where id = ?; update product set deleted = 0 where category_id=?',
                [id, id],
                callback,
            );
        } else {
            // console.log(data);
            return connection.query(dbName, 'update category set ' + arr + ' where id = ?', [id], callback);
        }
    },

    sortCategory: function (dbName, data, callback) {
        // console.log(data);

        const keys = Object.keys(data);
        // const arr = keys.map((key) => ` (${data[key]},${key})`);
        const arr = keys.map((key) => ` when id = '${data[key]}' then '${key}'`).join('');
        const idList = keys.map((key) => `'${data[key]}'`);

        return connection.query(
            dbName,
            'UPDATE category SET sort = (case ' + arr + ' end) WHERE id in (' + idList + ')',
            [data.name],
            callback,
        );
    },

    //no Auth
    getAllDataOfP: function (dbName, callback) {
        return connection.query(
            dbName,
            'select * from product where deleted = 1 AND hidden = 0 ; select * from category where is_deleted = 0 order by sort',
            callback,
        );
    },

    getProductAdmin: function (dbName, callback) {
        return connection.query(dbName, 'select * from product', callback);
    },
    getAllCategory: function (dbName, callback) {
        return connection.query(dbName, 'select * from category where is_deleted = 0 order by sort', callback);
    },
    changeImage: function (dbName, callback) {
        return connection.query(dbName, 'select id,description from product', callback);
    },
    updateImage: function (dbName, data, callback) {
        return connection.query(
            dbName,
            'update product set description = ? where id = ?',
            [data.img, data.id],
            callback,
        );
    },
};
module.exports = Product;
