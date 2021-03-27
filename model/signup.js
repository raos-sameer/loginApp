const mongoose = require("mongoose");

//Schema

const Schema = mongoose.Schema;
const SignUpSchema = new Schema({
  email: String,
  fullName: String,
  password: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const SignUp = mongoose.model("SignUp", SignUpSchema);

module.exports = SignUp;
