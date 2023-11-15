//MAIN BACKEND FILE
const db = require("./database/index.js");
const PatientModel = require("./database/patients");
const DoctorModel = require("./database/doctors");
const DepartmentModel = require("./database/departments");
const express = require("express");
const app = express();
app.use(express.json());

//const { MongoClient } = require('mongodb');
var mongoose = require("mongoose");
//const PatientModel = require("./database/patients");
var mongoDB =
  "mongodb+srv://Mahita07:mahita23112002@cluster0.kvbh5.mongodb.net/hospital-management?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTION ESTABLISHED"));
/*client.connect(err => {
  const collection = client.db("hospital-management").collection("patients");
  // perform actions on the collection object
  client.close();
});*/

//GET APIs********************************************************************************
//PATIENT
//get all patient details
//http://localhost:3000/patients
app.get("/patients", async (req, res) => {
  const getAllPatients = await PatientModel.find();
  return res.json(getAllPatients);
});

//get specific patient details based on regno
//http://localhost:3000/patient-regno/130613
app.get("/patient-regno/:regno", async (req, res) => {
  const { regno } = req.params;
  console.log(req.params);
  const getSpecificPatient = await PatientModel.findOne({ Regno: regno });
  if (getSpecificPatient === null) {
    return res.json({ error: `No patient with regno ${regno} exists` });
  }
  return res.json(getSpecificPatient);
});

//get specific patient details based on deptno
//http://localhost:3000/patient-dept/Orthopaedics
app.get("/patient-dept/:dept", async (req, res) => {
  const { dept } = req.params;
  const getSpecificPatient = await PatientModel.find({ recdepartment: dept });
  if (getSpecificPatient.length === 0) {
    return res.json({ error: `No patient found in department ${dept}` });
  }
  return res.json(getSpecificPatient);
});

//get patients details based on doctor
//http://localhost:3000/patient-id/1
app.get("/patient-id/:ID", async (req, res) => {
  const { ID } = req.params;
  //console.log(ID);
  const getSpecificPatient = await PatientModel.find({ recdoctor: ID });
  if (getSpecificPatient.length === 0) {
    return res.json({ error: `No patient found under id ${dept}` });
  }
  return res.json(getSpecificPatient);
});

//DOCTOR
//get all doctors details
//http://localhost:3000/doctors
app.get("/doctors", async (req, res) => {
  const getAllDoctors = await DoctorModel.find();
  return res.json(getAllDoctors);
});

//get specific doctor details based on id
//http://localhost:3000/doctor-id/1
app.get("/doctor-id/:ID", async (req, res) => {
  const { ID } = req.params;
  //console.log(ID);
  const getSpecificDoctor = await DoctorModel.findOne({ id: ID });
  if (getSpecificDoctor === null) {
    return res.json({ error: `No doctor with ID ${ID} exists` });
  }
  return res.json(getSpecificDoctor);
  /*const getSpecificDoctor = db.doctors.filter((doctor) => doctor.id === ID);
    if(getSpecificDoctor.length===0)
    {
        return res.json({"error":`No doctor with id ${ID} found`});
    }
    return res.json(getSpecificDoctor[0]);*/
});

//get doctors details based on patient regno
//http://localhost:3000/doctor-patient/180294
app.get("/doctor-patient/:Patient", async (req, res) => {
  const { Patient } = req.params;
  console.log(Patient);
  const getSpecificDoctor = await DoctorModel.find({ patients: Patient });
  if (getSpecificDoctor.length === 0) {
    return res.json({ error: `No doctor found under patient ${Patient}` });
  }
  return res.json(getSpecificDoctor);
});

//DEPARTMENTS

//get all departments details
//http://localhost:3000/departments
app.get("/departments", async (req, res) => {
  const getAllDepartments = await DepartmentModel.find();
  return res.json(getAllDepartments);
});

//get specific department details based on deptno
//http://localhost:3000/department-deptno/1
app.get("/department-deptno/:Deptno", async (req, res) => {
  const { Deptno } = req.params;
  console.log(Deptno);
  const getSpecificDepartment = await DepartmentModel.findOne({
    deptno: Deptno,
  });
  if (getSpecificDepartment === null) {
    return res.json({ error: `No patient with deptno ${Deptno} exists` });
  }
  return res.json(getSpecificDepartment);
});

//get specific department details based on patient regno
//http://localhost:3000/department-regno/180294
app.get("/department-regno/:regno", async (req, res) => {
  const { regno } = req.params;
  const getSpecificDepartment = await DepartmentModel.find({ patients: regno });
  if (getSpecificDepartment === null) {
    return res.json({ error: `No department found with patient ${regno}` });
  }
  return res.json(getSpecificDepartment);
});

//POST API S*************************************************************************
//PATIENT
//post new patient
//http://localhost:3000/patient
app.post("/patient", (req, res) => {
  //console.log(req.body);
  const addNewPatient = PatientModel.create(req.body);
  return res.json({ Patient: addNewPatient, Message: "Patient was added !!" });
});

//DOCTOR
//post new doctor
//http://localhost:3000/doctor
app.post("/doctor", (req, res) => {
  //console.log(req.body);
  const addNewDoctor = DoctorModel.create(req.body);
  return res.json({ Doctor: addNewDoctor, Message: "Doctor was added" });
});

//DEPARTMENT
//post new department
//http://localhost:3000/department
app.post("/department", (req, res) => {
  console.log(req.body);
  const addNewDepartment = DepartmentModel.create(req.body);
  return res.json({
    Department: addNewDepartment,
    Message: "Department was added",
  });
});

//PUT APIs*********************************************************************************
//PATIENT
//update details of patient
//http://localhost:3000/patient-update/130613
app.put("/patient-update/:regno", async (req, res) => {
  const { regno } = req.params;
  console.log(req.body);
  const updatePatient = await PatientModel.findOneAndUpdate(
    { Regno: regno },
    req.body,
    { new: true }
  );
  return res.json({
    patientUpdated: updatePatient,
    Message: "Patient details were updated !!",
  });
});

//update/add doctors
//http://localhost:3000/patient-update-doctor/130613/4
app.put("/patient-update-doctor/:regno/:ID", async (req, res) => {
  const { regno, ID } = req.params;
  console.log(ID);
  console.log(regno);
  let getSpecificPatient = await PatientModel.findOne({ Regno: regno });
  if (getSpecificPatient === null) {
    return res.json({ error: `No patient with regno ${regno} was found` });
  } else {
    getSpecificPatient.recdoctor = [...getSpecificPatient.recdoctor, ID];
    console.log(getSpecificPatient.recdoctor);
    const updatePatient = await PatientModel.findOneAndUpdate(
      { recdoctor: ID },
      getSpecificPatient,
      { new: true }
    );
    console.log(updatePatient);
    return res.json({
      patientUpdated: updatePatient,
      Message: "Doctor was added from Patient Details.",
    });
  }
});

//DOCTOR
//update details of doctor
//http://localhost:3000/doctor-update/2
app.put("/doctor-update/:ID", async (req, res) => {
  const { ID } = req.params;
  console.log(req.body);
  console.log(req.body);
  const updateDoctor = await DoctorModel.findOneAndUpdate(
    { id: ID },
    req.body,
    { new: true }
  );
  return res.json({
    doctorUpdated: updateDoctor,
    Message: "Doctor details were updated !!",
  });
});

//update/add patient details to doctor
//http://localhost:3000/doctor-update-patient/3/130613
app.put("/doctor-update-patient/:ID/:regno", (req, res) => {
  const { ID, regno } = req.params;
  console.log(ID);
  console.log(regno);
  db.doctors.forEach((doctor) => {
    if (doctor.id === ID) {
      if (doctor.patients.includes(regno)) {
        return;
      }
      doctor.patients = [...doctor.patients, regno];
      console.log(doctor);
      return doctor;
    }
    return doctor;
  });
  return res.json(db.doctors);
});

//DEPARTMENT
//update details of department
//http://localhost:3000/department-update/1
app.put("/department-update/:Deptno", async (req, res) => {
  const { Deptno } = req.params;
  console.log(req.body);
  const updateDepartment = await DepartmentModel.findOneAndUpdate(
    { deptno: Deptno },
    req.body,
    { new: true }
  );
  return res.json({
    departmentUpdated: updateDepartment,
    Message: "Department details were updated !!",
  });
});

//update/add doctor details to department
//http://localhost:3000/department-update-doctor/3/1
app.put("/department-update-doctor/:Deptno/:ID", (req, res) => {
  const { Deptno, ID } = req.params;
  console.log(Deptno);
  console.log(ID);
  db.departments.forEach((department) => {
    if (department.deptno === Deptno) {
      if (department.doctors.includes(ID)) {
        return;
      }
      department.doctors = [...department.doctors, ID];
      console.log(department);
      return department;
    }
    return department;
  });
  return res.json(db.departments);
});

//DELETE APIs******************************************************************************
//PATIENT
//delete patient details
//http://localhost:3000/patient-delete/130613
app.delete("/patient-delete/:regno", async (req, res) => {
  const { regno } = req.params;
  //console.log(regno);
  const deletePatient = await PatientModel.deleteOne({ Regno: regno });
  return res.json({
    patientDeleted: deletePatient,
    Message: "Patient details were removed !!",
  });
});

//delete doctor from patient details
//http://localhost:3000/patient-delete-doctor/180294/1
app.delete("/patient-delete-doctor/:regno/:ID", async (req, res) => {
  let { regno, ID } = req.params;
  let getSpecificPatient = await PatientModel.findOne({ Regno: regno });
  if (getSpecificPatient === null) {
    return res.json({ error: `No patient with regno ${regno} was found` });
  } else {
    getSpecificPatient.recdoctor.remove(ID);
    const updatePatient = await PatientModel.findOneAndUpdate(
      { recdoctor: ID },
      getSpecificPatient,
      { new: true }
    );
    return res.json({
      patientUpdated: updatePatient,
      Message: "Doctor was removed from Patient Details.",
    });
  }
});

//DOCTOR
//delete doctor details
//http://localhost:3000/doctor-delete/1
app.delete("/doctor-delete/:ID", async (req, res) => {
  const { ID } = req.params;
  console.log(ID);
  const deleteDoctor = await DoctorModel.deleteOne({ id: ID });
  return res.json({
    doctorDeleted: deleteDoctor,
    Message: "Doctor details were removed !!",
  });
});

//DEPARTMENT
//delete department details
//http://localhost:3000/department-delete/1
app.delete("/department-delete/:Deptno", async (req, res) => {
  const { Deptno } = req.params;
  console.log(Deptno);
  const deleteDepartment = await DepartmentModel.deleteOne({ deptno: Deptno });
  return res.json({
    doctorDepartment: deleteDepartment,
    Message: "Department details were removed !!",
  });
});

//delete patient details from department
//http://localhost:3000/department-delete-patient/1/180294
app.delete("/department-delete-patient/:Deptno/:regno", async (req, res) => {
  let { Deptno, regno } = req.params;
  console.log(Deptno);
  console.log(regno);
  let getSpecificDepartment = await DepartmentModel.findOne({ deptno: Deptno });
  if (getSpecificDepartment === null) {
    return res.json({ error: `No department with deptno ${Deptno} was found` });
  } else {
    getSpecificDepartment.patients.remove(regno);
    const updateDepartment = await DepartmentModel.findOneAndUpdate(
      { patients: regno },
      getSpecificDepartment,
      { new: true }
    );
    return res.json({
      departmentUpdated: updateDepartment,
      Message: "Patient was removed from Department",
    });
  }
});

app.listen(3000, () => {
  console.log("EXPRESS IS RUNNING");
});
