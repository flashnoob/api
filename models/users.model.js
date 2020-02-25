const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchemas = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  userName: { type: String, required: true, max: 30 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  mobileNo: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model("Users", UserSchemas);
