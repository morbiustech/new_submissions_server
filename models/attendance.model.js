const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        date_attended: Date,
        student_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Students'
            }
        ],
        fee_id:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Fees'
            }
        ]
      },
      { timestamps: true }
);
schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
});
  
const Attendance = mongoose.model("Attendance", schema);
module.exports = Attendance

  