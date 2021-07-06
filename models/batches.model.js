const mongoose = require("mongoose");

const schema = mongoose.Schema({
    batch_name:String,
    batch_timing:String,
    batch_description:String,
    batch_start_date:Date,
    batch_end_date:Date,
    batch_grade:String,
  })

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Batches = mongoose.model("Batches", schema);

module.exports = Batches;