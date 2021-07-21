const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        fee_amount: Number,
        lectures_alloted:Number,
        fee_cycle: Number,
        remarks:String,
        valid_till:Date,
        extended_period:Date,
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
  
const Fees = mongoose.model("Fees", schema);
module.exports = Fees

  