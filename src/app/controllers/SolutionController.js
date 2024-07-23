const solutionModel = require("../models/Solutions");

module.exports = {
  handleAddSolutions(req, res, next) {
    const dbName = req.dbName;

    solutionModel.addSolutions(dbName, req.body, (err, results, fields) => {
      console.log("add solutions", fields);
      if (err) {
        return res.json({
          status: 0,
        });
      } else {
        return res.json({
          status: 1,
        });
      }
    });
  },
  handleDeleteSolutionById(req, res, next) {
    const dbName = req.dbName;
    const solId = req.params.id;
    solutionModel.deleteSolutionById(dbName, solId, (err, results, fields) => {
      if (err) {
        return res.json({
          status: 0,
        });
      } else {
        return res.json({
          status: 1,
        });
      }
    });
  },
  handleGetAllSolutions(req, res, next) {
    const dbName = req.dbName;
    solutionModel.getAllSolutions(dbName, (err, results, fields) => {
      if (err) {
        return res.json({
          status: 0,
        });
      } else {
        results.forEach(sol => {
            sol.images = sol.images.split(',')
        });
        return res.json(results);
      }
    });
  },
};
