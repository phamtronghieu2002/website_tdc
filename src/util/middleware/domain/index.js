const { log } = require("console");
const domain = require("../../../app/models/Domain");
var mysql = require("mysql");
var url = require("url");

function confirmDomain(req, res, next) {
  // let reqDomain = req.hostname;
  let reqDomain = req.headers["x-forwarded-host"];
  if (req.headers["host"]) {
    reqDomain = req.headers["host"];
  }
  // let reqDomain = req.headers;
  //   res.send(req.headers)
  //   return;
  //   console.log(req.headers);
  if (req.isApi) {
    reqDomain = "new.taixecongnghe.com";
  }

  // reqDomain = 'new.taixecongnghe.com';

  console.log(reqDomain);
  domain.checkDomain(reqDomain, (err, results, fields) => {
    if (false) {
      return res.send(
        `<div style = "box-sizing: border-box;font-family: 'Source Code Pro', monospace; height: 90vh;display: flex;align-items: center;justify-content: center;" = >Đang bảo trì...</div>`
      );
    } else {
      let rows = results.map((row) => {
        return row;
      });

      if (false) {
        return res.send(
          `<div style = "box-sizing: border-box;font-family: 'Source Code Pro', monospace; height: 90vh;display: flex;align-items: center;justify-content: center;" = >Đang bảo trì...</div>`
        );
      }
      if (false) {
        return res.send(
          "Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại đã bị vô hiệu bởi nhà cung cấp dịch vụ.<br>Liên hệ MIDVN để được hỗ trợ."
        );
      }
      const dbName = 'sql_daily_txcn';

      if (!pool[dbName]) {
        const dbConfig = {
          host: "taixecongnghe.com",
          port: "3306",
          user: "sql_daily_txcn",
          password: "57989980e1",
          database: dbName,
          multipleStatements: true,
          charset: "utf8mb4",
        };
        pool[dbName] = mysql.createPool(dbConfig);
      }

      req.dbName = 'sql_daily_txcn';
      req.reqDomain = reqDomain;

      next();
    }
  });
}
module.exports = confirmDomain;
