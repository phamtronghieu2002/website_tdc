const connection = require('../../configs/connectDB');
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var Content = {
    updateContent: function (dbName, data, callback) {
        // console.log(data);
        return connection.query(
            dbName,
            'update view_content set content = ? where view = ? AND name = ?',
            [data.content, data.view, data.name],
            callback,
        );
    },

    updateService: function (dbName, data, callback) {
        // console.log(data);
        const id = data.id;
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => data[key]);
        // console.log(arr);
        return connection.query(dbName, `update view_service set ` + keys_ + `where id = ${id}`, [...arr], callback);
    },

    updateNews: function (dbName, data, callback) {
        // console.log(data);
        const id = data.id;
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => data[key]);
        // console.log(arr);
        return connection.query(dbName, `update blog set ` + keys_ + ` where id = ${id}`, [...arr], callback);
    },

    updateRecruitment: function (dbName, data, callback) {
        // console.log(data);
        const id = data.id;
        const keys = Object.keys(data);
        const keys_ = keys.map((key) => ` ${key} = ?`);
        const arr = keys.map((key) => data[key]);
        // console.log(arr);
        return connection.query(dbName, `update recruitments set ` + keys_ + ` where id = ${id}`, [...arr], callback);
    },

    addService: function (dbName, data, callback) {
        // console.log(data);
        // const keys = Object.keys(data);
        // const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
        // console.log(arr);
        return connection.query(
            dbName,
            `insert into view_service(name, slug, discription, image, content, hidden) value(?,?,?,?,?,?)`,
            [data.name, data.slug, data.discription, data.image, data.content, data.hidden],
            callback,
        );
    },

    addPolicys: function (dbName, data, callback) {
        return connection.query(
            dbName,
            `insert into policys(title, title_en, content, content_en, name, name_en) value (?,?,?,?,?,?)`,
            [data.title, data.title_en, data.content, data.content_en, data.name, data.name_en],
            callback,        );
    },

    addNews: function (dbName, data, callback) {
        // console.log(data);
        // const keys = Object.keys(data);
        // const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
        // console.log(arr);
        return connection.query(
            dbName,
            `insert into blog(title, date, slug, subcontent, content , tags, img, is_blog, featured, hidden,title_en,subcontent_en,content_en,slug_en) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.date,
                data.slug,
                data.subcontent,
                data.content,
                data.tags,
                data.img,
                data.is_blog,
                data.featured,
                data.hidden,
                data.title_en,
                data.subcontent_en,
                data.content_en,
                data.slug_en,
            ],
            callback,
        );
    },

    addRecruitment: function (dbName, data, callback) {
        // console.log(data);
        // const keys = Object.keys(data);
        // const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
        // console.log(arr);
        return connection.query(
            dbName,
            `insert into recruitments(title, slug, date, des, content, image, quantity, expiration_date, salary, workplace, hidden) value(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.slug,
                data.date,
                data.des,
                data.content,
                data.image,
                data.quantity,
                data.expiration_date,
                data.salary,
                data.workplace,
                data.hidden,
            ],
            callback,
        );
    },

    // deleteLocation: function (id, callback) {
    //     return connection.query('update radius_locations set is_delete=? WHERE id=?', [1, Number(id)], callback);
    // },
    // deleteRecord: function (id, callback) {
    //     return connection.query('update location_record set is_delete=? WHERE id=?', [1, Number(id)], callback);
    // },
    // deleteAllLocationRecord: function (callback) {
    //     return connection.query('update location_record set is_delete=?', [1], callback);
    // },
    // deleteRecordUndefined: function (callback) {
    //     return connection.query(
    //         'delete from `location_record` where record_type=? AND time_out= ?',
    //         [1, 'Chưa xác định'],
    //         callback,
    //     );
    // },
    // updateTimeOutRecord: function (vehicle, id, time, callback) {
    //     return connection.query(
    //         'update location_record set time_out=? WHERE vehicle = ? AND location_id = ?  ORDER BY id DESC LIMIT ?',
    //         [time, vehicle, id, 1],
    //         callback,
    //     );
    // },
    // updateSV: function (id, sinhvien, callback) {
    //     return connection.query(
    //         'update sinhvien set name=?,class=?,dob=? where Id=?',
    //         [sinhvien.name, sinhvien.class, sinhvien.dob, id],
    //         callback,
    //     );
    // },
};
module.exports = Content;
