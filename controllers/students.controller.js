const db = require("../models");
const Students = db.students

const formData = require('form-data');
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData);
const Handlebars = require('handlebars');
const fs = require('fs')
const { data } = require('../data')

const mg = mailgun.client({
  username:'api',
  key: data.MAILGUN_API_KEY,
  public_key: data.PUBLIC_KEY

})

const templateSource = fs.readFileSync('onboarding.hbs','utf-8');
// Compile the template
const template = Handlebars.compile(templateSource);

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.first_name
       || !req.body.last_name || !req.body.phone 
       || !req.body.email || !req.body.course_id
      ) {
    res.status(400).send({ message: "Student Name or Student Grade or Batch ID cannot be empty!" });
    return;
  }

  // Create a Tutorial
  const student_data = new Students({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone:req.body.phone,
    email:req.body.email,
    parent_email: req.body.parent_email,
    parent_contact: req.body.parent_contact,
    address:req.body.address,
    mode:req.body.mode,
    course_id:req.body.course_id
  })
  console.log(student_data)

  // Save Todo in the database
  Students.create(student_data).then(data => {

       res.send(data);
       const name = student_data.first_name+' '+student_data.last_name
       const email = student_data.email
       const subject = 'Welcome Onboard!'
       const text = 'We wish you all the best in your musical adventures!'
       const myData = {
        subject: subject,
        greeting: 'Hello',
        name: name,
        message: text,
        sender: 'Your Company'
      };
       const renderedEmail = template(myData);
       try{
        mg.messages.create('notifications.morbius.co', {
            from: '101musicals@gmail.com',
            to: email,
            subject: subject,
            html: renderedEmail
          })
          .then(msg => {
                console.log(msg)
                res.sendStatus(200)
          }) 
          .catch(err => {
            console.error(err)
          });
        }
        catch(e){
            console.log(e)
        }

    })
    .catch(err => {
      res.status(500)
    });
  
};

exports.findOne = (req, res) => {

  const id = req.body.id;

  Students.findById(id)
    .populate('course_id')
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
    .populate('course_id')
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
