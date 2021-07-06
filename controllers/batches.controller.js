const db = require("../models");
const Batches = db.batches;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.batch_name || !req.body.batch_timing 
    || !req.body.batch_description || !req.body.batch_grade
    || !req.body.batch_start_date || !req.body.batch_end_date
    ) {
    res.status(400).send({ message: "Batch Name or Batch Grade, Batch timing,Description cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const batch_data = new Batches({
    batch_name: req.body.batch_name,
    batch_grade: req.body.batch_grade,
    batch_timing: req.body.batch_timing,
    batch_start_date: req.body.batch_start_date,
    batch_end_date: req.body.batch_end_date,
    batch_description: req.body.batch_description,
   
  })
  console.log(batch_data)

  // Save Todo in the database
  Batches.create(batch_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Batch."
      });
    });
  
};
exports.findAll = (req, res) => {


Batches.find().then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while creating the Batch."
  });
});

};

exports.deleteAll = (req, res) => {

  Batches.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Batches were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Batches."
    });
  });

};

