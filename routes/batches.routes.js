module.exports = app => {
    const batches = require("../controllers/batches.controller");
  
    var router = require("express").Router();
  
    // Create a new Batch
    router.post("/batch/create", batches.create);

    // Find All Batches
    router.get("/batch/find/all",batches.findAll)

    router.delete("/batch/delete/all",batches.deleteAll)
 
 
  
    app.use('/api/submissions', router);
  };