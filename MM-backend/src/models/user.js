var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    username: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
        type: Date,
    },
    phone:{
        type: Number,
    },
    role: {
      type: Number,
      default: 0,
    },
    post: {
        type: Array,
        default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
