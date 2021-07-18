module.exports = app => {
    const Courses = require("../controllers/courses.controller");
  
    var router = require("express").Router();
  
    // Create a new Batch
    router.post("/course/add", Courses.create);

    // Find All Batches
    router.get("/course/find/all",Courses.findAll)

    router.delete("/course/delete/all",Courses.deleteAll)
 
 
  
    app.use('/api/submissions', router);
  };