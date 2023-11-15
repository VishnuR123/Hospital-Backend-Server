const mongoose = require("mongoose");

//creating department schema
const DepartmentSchema = mongoose.Schema({
  deptno: String,
  deptname: String,
  doctors: [String],
  patients: [String],
});

const DepartmentModel = mongoose.model("departments", DepartmentSchema);

module.exports = DepartmentModel;
