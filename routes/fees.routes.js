module.exports = app => {
    const Fees = require("../controllers/fees.controller");
  
    var router = require("express").Router();
  
    // Create a fees details
    router.post("/fees/add", Fees.create);

    // get all fees details
    router.get("/fees/all",Fees.findAll)

    // get individual fee details
    router.post("/student/fees/details",Fees.findOne)


    // delete individual fees data
    router.delete("/fees/single/remove/:id",Fees.deleteOne)

    // delete all fees collection
    router.delete("/fees/remove/all",Fees.deleteAll)

    // get fee receipt details
    router.post("/fees/receipt/details",Fees.getFeeReceiptDetails)
   
    app.use('/api/submissions', router);
  };