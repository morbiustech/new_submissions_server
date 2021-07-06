const db = require("../models");
const Students = db.students

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.student_name || !req.body.student_grade || !req.body.batch_id) {
    res.status(400).send({ message: "Student Name or Student Grade or Batch ID cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const student_data = new Students({
    student_name: req.body.student_name,
    student_grade: req.body.student_grade,
    batch_id:req.body.batch_id
  })
  console.log(student_data)

  // Save Todo in the database
  Students.create(student_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Student Details."
      });
    });
  
};

exports.findAll = (req, res) => {


  Students.find()
    .populate('batch_id')
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

  Students.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Students were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Students."
    });
  });


};
