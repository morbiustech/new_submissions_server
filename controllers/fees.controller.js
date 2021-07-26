const db = require("../models");
const Fees = db.fees

// Create and Save a new Todo
exports.create = (req, res) => {

  console.log('student id is ',req.body.student_id)
  console.log(req.body)
      // Validate request
  if (!req.body.fee_amount || !req.body.lectures_alloted || !req.body.student_id || !req.body.fee_cycle) {
    res.status(400).send({ message: "fee_amount  or lectures_alloted  or student_id  cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const fees_data = new Fees({
    fee_amount: req.body.fee_amount,
    lectures_alloted: req.body.lectures_alloted,
    fee_cycle:req.body.fee_cycle,
    valid_till:req.body.valid_till,
    extended_period:req.body.extended_period,
    remarks:req.body.remarks,
    student_id:req.body.student_id
  })
  console.log(fees_data)

  // Save Todo in the database
  Fees.create(fees_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Fees Details."
      });
    });
  
};

exports.findOne = (req, res) => {

  const id = req.body.student_id;

  Fees.find({student_id: [ { _id: id }]})
  .populate('student_id')
  .then(data=>{
      res.send(data)
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


  Fees.find()
    .populate('student_id')
    .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while fetching all fees details."
    });
  });
  
};


exports.deleteOne = (req, res) => {

  const id = req.params.id;

  Fees.findByIdAndRemove(id,{ useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fees with id=${id}. Maybe Fees was not found!`
        });
      } else {
        res.send({
          message: "Fees was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete fees with id=" + id
      });
    });

};


exports.deleteAll = (req, res) => {

  Fees.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Fees Data were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Fees Data."
    });
  });


};

exports.getFeeReceiptDetails = (req, res) => {

  const id = req.body.fee_id
  
  Fees.findById(id)
  .populate('student_id')
  .then(data=>{
      res.send(data)
  })
  .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Student with id=" + id });
    });
  


};

exports.getFeesData = (req,res) =>{


  const id = req.body.fee_id;

  Fees.findById(id)
  .populate('student_id')
  .then(data=>{
      res.send(data)
  })
  .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Student with id=" + id });
    });
  



}