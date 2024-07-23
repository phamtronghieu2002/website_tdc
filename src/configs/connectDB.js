var mysql = require('mysql');
// const sqlConfig = {
//     midDB: {
//         host: 'daily.intern.midvietnam.com',
//         port: '3308',
//         user: 'sql_daily_intern',
//         password: 'Xcr55PGMze3nMGb5',
//         database: 'sql_daily_khachhang1',
//         multipleStatements: true,
//         charset: 'utf8mb4',
//     },
//     nblDB: {
//         host: 'daily.intern.midvietnam.com',
//         port: '3308',
//         user: 'sql_daily_intern',
//         password: 'Xcr55PGMze3nMGb5',
//         database: 'sql_daily_intern',
//         multipleStatements: true,
//         charset: 'utf8mb4',
//     },
// };
// var pool = [mysql.createPool(sqlConfig.midDB), mysql.createPool(sqlConfig.nblDB)];
module.exports = {
    query: function () {
        const random = Math.floor(Math.random() * 10);

        // console.log(x);
        var sql_args = [];
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var callback = args[args.length - 1];
        const dbName = args[0];

        // console.log(args);
        if (!pool[dbName]) {
            console.log('Error when connect Database: ', args[1]);
            return;
        }
        pool[dbName].getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (args.length > 3) {
                sql_args = args[2];
            }
            connection.ping();
            connection.query(args[1], sql_args, function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },
    connect: function () {
        pool[dbName].getConnection(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
            }
        });
    },
};

// let pool;
// let domain = getUser()
// if(db[`${domain}`]){
//     pool =  db[`${domain}`].pool
// } else {
//     db[`${domain}`].pool = mysql.createPool(sqlConfig);
//     pool =  db[`${domain}`].pool
// }

// pool.getConnection(function (err) {
//     if (err) {
//         console.log('error when connecting to db:', err);
//     } else {
//         console.log('success connect db');
//     }
// });

// function keepAlive() {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             console.error('mysql keepAlive err', err);
//             return;
//         }
//         connection.ping(); // this is what you want
//         connection.release();
//     });
// }
// setInterval(keepAlive, 60000);

// module.exports = pool;
