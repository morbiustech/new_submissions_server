module.exports = app => {
    const Fees = require("../controllers/fees.controller");
  
    var router = require("express").Router();
  
    // Create a fees details
    router.post("/fees/add", Fees.create);

    // get all fees details
    router.get("/fees/all",Fees.findAll)

    // delete all fees collection
    router.delete("/fees/remove/all",Fees.deleteAll)

   
    app.use('/api/submissions', router);
  };