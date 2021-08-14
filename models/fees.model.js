const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        fee_amount:{
            type:Number,
            required:true
        },
        lectures_alloted:{
            type:Number,
            required:true,

        },
        fee_cycle: {

            type:Number,
            required:true

        },
        remarks:{
          
            type: String,
            required:true

        },
        valid_till:{

            type:Date,
            required:true
        },
        extended_period:{

             type:Date,
             required:true

        },
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

  