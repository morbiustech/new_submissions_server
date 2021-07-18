const mongoose = require("mongoose");

const schema = mongoose.Schema({
    course_name:String
  })

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Courses = mongoose.model("Courses", schema);

module.exports = Courses;