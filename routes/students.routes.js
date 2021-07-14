module.exports = app => {
    const students = require("../controllers/students.controller");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/students/create", students.create);

    // Find all students 
    router.get("/students/find/all", students.findAll);

    // Find one student 
    router.post("/students/edit", students.findOne);

    // Delete individual student
    router.delete("/students/remove/:id",students.deleteOne)
  
    router.delete("/students/delete/all", students.deleteAll);
  
    app.use('/api/submissions', router);
  };