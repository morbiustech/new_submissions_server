const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        student_name: String,
        student_grade: String,
        batch_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Batches'
            }
        ],
      },
      { timestamps: true }
);
schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
});
  
const Students = mongoose.model("Students", schema);
module.exports = Students

  