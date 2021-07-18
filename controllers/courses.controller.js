const db = require("../models");
const Courses = db.courses;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.course_name) {
    res.status(400).send({ message: "Course Name is Required!" });
    return;
  }

  // Create a Tutorial
  const course_data = new Courses({
    course_name: req.body.course_name,
   
  })
  console.log(course_data)

  // Save Todo in the database
  Courses.create(course_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
  
};
exports.findAll = (req, res) => {


Courses.find().then(data => {
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

  Courses.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Courses were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Courses."
    });
  });

};

