const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        assignment_name: String,
        assignment_link: String,
        student_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Students'
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
  
const Assignments = mongoose.model("Assignments", schema);
module.exports = Assignments

  