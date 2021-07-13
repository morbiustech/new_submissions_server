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

exports.findOne = (req, res) => {

  const id = req.body.id;

  Students.findById(id)
    .populate('batch_id')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Student with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Student with id=" + id });
    });

};

exports.update = (req, res) => {

  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Students.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Students with id=${id}. Maybe Student was not found!`
          });
        } else res.send({ message: "Student was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
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


exports.deleteOne = (req, res) => {

  const id = req.body.id;

  Students.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
        });
      } else {
        res.send({
          message: "Student was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id
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
