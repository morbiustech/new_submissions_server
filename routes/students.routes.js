module.exports = app => {
    const students = require("../controllers/students.controller");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/students/create", students.create);

    // Find all students 
    router.get("/students/find/all", students.findAll);

    // Find one student 
    router.get("/students/edit", students.findOne);
  
    router.delete("/students/delete/all", students.deleteAll);
  
    app.use('/api/submissions', router);
  };