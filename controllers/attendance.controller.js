const db = require("../models");
const Attendance = db.attendance

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.date_attended || !req.body.fee_id ||  !req.body.student_id) {
    res.status(400).send({ message: "date_attended or student_id  cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const attendance_data = new Attendance({
    date_attended: req.body.date_attended,
    fee_id: req.body.fee_id,
    student_id:req.body.student_id,
  })

  console.log(attendance_data)

  // Save Todo in the database
  Attendance.create(attendance_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Attendance Details."
      });
    });
  
};

exports.findOne = (req, res) => {

  const student_id = req.body.student_id;

  Attendance.find({ student_id: student_id})
    .populate('student_id')
    .populate('fee_id')
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


  Attendance.find()
    .populate('student_id')
    .populate('fee_id')
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

  const id = req.params.id;

  Students.findByIdAndRemove(id,{ useFindAndModify: false })
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

exports.deleteOne = (req, res) => {

  const id = req.params.id;

  Attendance.findByIdAndRemove(id,{ useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Attendance with id=${id}. Maybe Attendance was not found!`
        });
      } else {
        res.send({
          message: "Attendance was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Attendance with id=" + id
      });
    });

};



exports.deleteAll = (req, res) => {

  Attendance.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Attendance were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Attendance."
    });
  });


};


exports.countAttendanceData = (req,res) => {

    const student_id = req.body.student_id
    const fee_id = req.body.fee_id 


    Attendance.find({ student_id: student_id, fee_id: fee_id })
    .countDocuments()
    .then(data=>{
            console.log(data)
            res.send({
                count: data
            })
    })
    .catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Batch."
          });
    })


}