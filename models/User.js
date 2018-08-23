const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Schema
const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  }
});

// Creating collection and adding schema
mongoose.model("users", UserSchema);
