const connection = require("../../configs/connectDB");

module.exports = {
  addSolutions(dbName, data, callback) {
    console.log("Data", data);
    return connection.query(
      dbName,
      "insert into solutions (name, priority,images,content,technum,banner,thumbnail,description,created_at) value(?,?,?,?,?,?,?,?,?)",
      [
        data.name,
        data.priority,
        data.images,
        data.content,
        data.technum,
        data.banner,
        data.thumbnail,
        data.description,
        new Date(),
    ],
      callback
    );
  },
  updateSolutions(dbName, data, callback) {
    return connection.query(
      dbName,
      "UPDATE solutions SET name = ?, priority = ?, images = ?, content = ?, technum = ? ,banner=?,thumbnail=?,description =? WHERE id = ?",
      [
        data.name,
        data.priority,
        data.images,
        data.content,
        data.technum,
        data.banner,
        data.thumbnail,
        data.description,
        data.id // Assuming you have an 'id' field to identify the solution to update
      ],
      callback
    );
  },
  deleteSolutionById(dbName, solId, callback) {
    return connection.query(
      dbName,
      "delete from solutions where id = ?",
      [solId],
      callback
    );
  },
  getAllSolutions(dbName, callback) {
    return connection.query(dbName, "select * from solutions order by priority", callback);
  },
};
