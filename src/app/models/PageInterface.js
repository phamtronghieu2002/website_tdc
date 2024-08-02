const connection = require("../../configs/connectDB");
var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);
var PageInterface = {
  getTableDB: function (dbName, callback) {
    // console.log(dbName);
    return connection.query(dbName, "SHOW TABLES;", callback);
  },
  createTable(dbName, callback) {
    return connection.query(
      dbName,
      ` CREATE TABLE IF NOT EXISTS solutions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      priority INT NOT NULL,
      images TEXT,
      content TEXT,
      technum TEXT,
      banner TEXT,
      thumbnail TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
      callback
    );
  },

  dropTableDB: function (dbName, callback) {
    return connection.query(
      dbName,
      `
      DROP TABLE IF EXISTS solutions
    `,
      callback
    );
  },
  getBasicInfor: function (dbName, callback) {
    // console.log(dbName);
    return connection.query(
      dbName,
      "select * from display_color; select * from daily_address where save = 0; select * from daily_email where save = 0; select * from daily_phone where save = 0; select * from daily_information; select * from config; select * from policys where is_deleted = 0; select * from advertisement",
      callback
    );
  },

  getDataHomePage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from view_content; select * from product where deleted = 1 AND hidden = 0 ; select * from category where is_deleted = 0 order by sort;",
      callback
    );
  },
  getDataProductPage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from product where deleted = 1 AND hidden = 0 ; select * from category where is_deleted = 0 order by sort; select * from advertisement",
      callback
    );
  },
  getDataSearchPage: function (dbName, q, callback) {
    return connection.query(
      dbName,
      `select * from product where hidden = 0 AND deleted = 1 AND title Like '%${q}%' ; select * from category where is_deleted = 0 order by sort; select * from advertisement`,

      callback
    );
  },
  getDataProductDetailPage: function (dbName, slug, callback) {
    return connection.query(
      dbName,
      "select * from product where deleted = 1 AND hidden = 0 AND slug = ?; select * from category where is_deleted = 0 order by sort ",
      [slug],
      callback
    );
  },
  getDataServicePage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from view_service where is_deleted = 0 AND hidden = 0 ",
      callback
    );
  },
  getDataServiceDetailPage: function (dbName, slug, callback) {
    return connection.query(
      dbName,
      "select * from view_service where is_deleted = 0 AND hidden = 0 AND slug = ? ",
      [slug],
      callback
    );
  },

  getDataNewsPage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from blog where is_deleted = 0 AND hidden = 0 order by date DESC",
      callback
    );
  },

  getNews: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from blog where is_deleted = 0 AND hidden = 0 order by id DESC,date DESC",
      callback
    );
  },

  getDataNewsDetailPage: function (dbName, slug, callback,slugFỉeld) {
    return connection.query(
      dbName,
      `select * from blog where is_deleted = 0 AND hidden = 0 AND ${slugFỉeld} = ?; select * from blog where is_deleted = 0 AND hidden = 0 order by id DESC,date DESC`,
      [slug],
      callback
    );
  },

  getDataRecrPage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from recruitments where deleted = 1 AND hidden = 0 order by expiration_date DESC",
      callback
    );
  },

  getDataPolicysPage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from policys where is_deleted = 0",
      callback
    );
  },
  getPolicys: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from policys where is_deleted = 0",
      callback
    );
  },

  getDataRecrDetailPage: function (dbName, slug, callback) {
    return connection.query(
      dbName,
      "select * from recruitments where deleted = 1 AND hidden = 0 AND slug = ?; select * from recruitments where deleted = 1 AND hidden = 0 order by expiration_date DESC",
      [slug],
      callback
    );
  },
  getRecrContent: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from recruitments where deleted = 1 order by expiration_date DESC",
      callback
    );
  },

  getServiceContent: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from view_service where is_deleted = 0  ",
      callback
    );
  },
  getNewsContent: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from blog where is_deleted = 0 order by id DESC,date DESC",
      callback
    );
  },
  getTheme: function (dbName, callback) {
    return connection.query(dbName, "select * from display_color", callback);
  },
  getMainInforMation: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from daily_information;select * from daily_address where save = 0; select * from daily_email where save = 0; select * from daily_phone where save = 0",
      callback
    );
  },
  themeUpdate: function (dbName, data, callback) {
    // console.log(data);
    const keys = Object.keys(data);
    const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
    return connection.query(dbName, "update display_color set" + arr, callback);
  },
  seoUpdate: function (dbName, data, callback) {
    // console.log(data);
    const keys = Object.keys(data);
    const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
    return connection.query(
      dbName,
      "update daily_information set" + arr,
      callback
    );
  },
  uploadImage: function (dbName, data, callback) {
    // console.log(data);

    return connection.query(
      dbName,
      "insert into images(url) value (?)",
      [data.image],
      callback
    );
  },
  deleteImage: function (dbName, id_List, callback) {
    // console.log(data);

    return connection.query(
      dbName,
      "update images set is_delete = 1 where id in (" + id_List + ")",
      callback
    );
  },
  allImage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from images where is_delete = 0",
      callback
    );
  },
  fixAllImage: function (dbName, callback) {
    return connection.query(
      dbName,
      "select id, thumbnail from product where deleted = 1",
      callback
    );
  },
  fixAllImageUpdate: function (dbName, data, callback) {
    return connection.query(
      dbName,
      "update product set thumbnail = ? where id = ?",
      [data.newUrl, data.id],
      callback
    );
  },
  getCv: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from apply where is_deleted = 0",
      callback
    );
  },
  getRecruitment: function (dbName, callback) {
    return connection.query(
      dbName,
      "select * from recruitments where deleted = 1",
      callback
    );
  },
  getRecruitmentAll: function (dbName, callback) {
    return connection.query(dbName, "select * from recruitments", callback);
  },
  addImage: function (dbName, data, callback) {
    // console.log(data);
    return connection.query(
      dbName,
      "insert into images(url) value(?)",
      [data.logo],
      callback
    );
  },
  basicInforUpdate: function (dbName, data, callback) {
    const data_ = {
      name: data.name,
      footer: data.footer,
      link_youtube: data.link_youtube,
      link_facebook: data.link_facebook,
      link_zalo: data.link_zalo,
      gov_link: data.gov_link,
    };
    if (data.logo) {
      data_.logo = data.logo;
    }
    // console.log(data_);
    const keys = Object.keys(data_);
    const arr = keys.map((key) => ` ${key} = '${data_[key]}'`);
    return connection.query(
      dbName,
      "update daily_information set" + arr,
      callback
    );
  },

  adressUpdate: function (dbName, data, callback) {
    let addressData = data.address;

    if (typeof addressData === "string") {
      addressData = [data.address];
    }
    // console.log(addressData);

    const dataInsert = addressData
      .map((address, index) => {
        if (index == 0) {
          return `('${address}',1, '${data.lat}' , '${data.lng}')`;
        } else {
          return `('${address}',0, '${data.lat}', '${data.lng}')`;
        }
      })
      .join(",");
    return connection.query(
      dbName,
      "DELETE FROM daily_address where save = 0; insert into daily_address(location,location_main, lat, lng) value " +
        dataInsert,

      callback
    );
  },
  emailUpdate: function (dbName, data, callback) {
    let emailData = data.email;

    if (typeof emailData === "string") {
      emailData = [data.email];
    }
    const dataInsert = emailData
      .map((email, index) => {
        if (index == 0) {
          return `('${email}', 1)`;
        } else {
          return `('${email}', 0)`;
        }
      })
      .join(",");
    return connection.query(
      dbName,
      "DELETE FROM daily_email where save = 0; insert into daily_email(email, email_main) value " +
        dataInsert,

      callback
    );
  },

  phoneUpdate: function (dbName, data, callback) {
    let phoneData = data.phone;

    if (typeof phoneData === "string") {
      phoneData = [data.phone];
    }
    const dataInsert = phoneData
      .map((phone, index) => {
        if (index == 0) {
          return `('${phone}', 1)`;
        } else {
          return `('${phone}', 0)`;
        }
      })
      .join(",");
    return connection.query(
      dbName,
      "DELETE FROM daily_phone where save = 0; insert into daily_phone(phone, hotline) value " +
        dataInsert,

      callback
    );
  },
  getAdvertisement: function (dbName, callback) {
    return connection.query(dbName, "select * from advertisement", callback);
  },

  updateAdvertisement: function (dbName, data, callback) {
    // console.log(data);
    const keys = Object.keys(data);
    const keys_ = keys.map((key) => ` ${key} = ?`);
    const arr = keys.map((key) => ` ${key} = '${data[key]}'`);
    return connection.query(dbName, "update advertisement set" + arr, callback);
  },

  updatePolicys: function (dbName, data, callback) {
    console.log("data >>",data);
    const id = data.id;
    const keys = Object.keys(data);
    const keys_ = keys.map((key) => ` ${key} = ?`);
    const arr = keys.map((key) => data[key]);
    // console.log(arr);
    return connection.query(dbName, `update policys set ` + keys_ + ` where id = ${id}`, [...arr], callback);
},


};
module.exports = PageInterface;
