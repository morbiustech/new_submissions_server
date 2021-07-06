const db = require("../models");
const Assignments = db.assignments

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.assignment_name || !req.body.assignment_link || !req.body.student_id) {
    res.status(400).send({ message: "Student Name or Student Grade or Batch ID cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const assignment_data = new Assignments({
    assignment_name: req.body.assignment_name,
    assignment_link: req.body.assignment_link,
    student_id:req.body.student_id
  })
  console.log(assignment_data)

  // Save Todo in the database
  Assignments.create(assignment_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Assignment Details."
      });
    });
  
};

exports.findAll = (req, res) => {


  Assignments.find()
    .populate('student_id')
    .then(data => {
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

  Assignments.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Assignments were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Students."
    });
  });


};
