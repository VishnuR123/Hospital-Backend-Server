const mongoose = require("mongoose");

//creating patient schema
const PatientSchema = mongoose.Schema({
  Regno: String,
  pname: String,
  gender: String,
  age: Number,
  regdate: String,
  address: String,
  city: String,
  pincode: String,
  phoneno: String,
  bloodgrp: String,
  healthcomplaints: [String],
  recdoctor: [String],
  recdepartment: [String],
});

const PatientModel = mongoose.model("patients", PatientSchema);

module.exports = PatientModel;
