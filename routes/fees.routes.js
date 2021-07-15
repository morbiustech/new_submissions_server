module.exports = app => {
    const Fees = require("../controllers/fees.controller");
  
    var router = require("express").Router();
  
    // Create a fees details
    router.post("/fees/add", Fees.create);

    // get all fees details
    router.get("/fees/all",Fees.findAll)

   
    app.use('/api/submissions', router);
  };