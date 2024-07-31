var mysql = require("mysql");
const { exec } = require('child_process');

// Thông tin kết nối đến cơ sở dữ liệu

const OUTPUT_FILE = 'backup.sql';


const sqlConfig = {
  host: "taixecongnghe.com",
  port: "3306",
  user: "sql_daily_domain_data",
  password: "cfcb201c98",
  database: "sql_daily_domain_data",
  multipleStatements: true,
  charset: "utf8mb4",
  // queryTimeout: 6000,
};
var pool = mysql.createPool(sqlConfig);


module.exports = {
  query: function () {
    const random = Math.floor(Math.random() * 10);
    let x = 0;
    // console.log(random);
    if (random > 5) {
      x = 1;
    }
    // console.log(x);
    var sql_args = [];
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var callback = args[args.length - 1];
    // console.log(args);
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (args.length > 2) {
        sql_args = args[1];
      }
      connection.ping();
      connection.query(args[0], sql_args, function (err, results) {
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
    pool.getConnection(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
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
