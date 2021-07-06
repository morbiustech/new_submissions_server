module.exports = app => {
    const assignments = require("../controllers/assignments.controller");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/assignments/create", assignments.create);

    // Get All Assignments
    router.get("/assignments/find/all", assignments.findAll);

    // Delete All Assignments
    router.delete("/assignments/delete/all",assignments.deleteAll)
  
    app.use('/api/submissions', router);
  }; 