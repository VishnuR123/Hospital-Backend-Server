const mongoose = require("mongoose");

//creating doctor schema
const DoctorSchema = mongoose.Schema({
  id: String,
  dname: String,
  qualification: String,
  patients: [String],
  department: String,
});

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
