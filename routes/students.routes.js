module.exports = app => {
    const students = require("../controllers/students.controller");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/students/create", students.create);

    router.get("/students/find/all", students.findAll);
  
    router.delete("/students/delete/all", students.deleteAll);
  
    app.use('/api/submissions', router);
  };