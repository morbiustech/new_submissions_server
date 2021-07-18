const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        first_name: String,
        last_name:String,
        email:String,
        phone:Number,
        address:String,
        mode:String,
        course_id: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Courses'
          }
        ],
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

  