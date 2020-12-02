var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema; 


var postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default:[]
    },
    likes: {
        type: Number,
        default: 0
    },
    likedUsers: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    postedBy: {
        type: String,
        required: true
    },
    postedByUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
