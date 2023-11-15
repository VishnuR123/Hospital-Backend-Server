let patients = [
  {
    Regno: "130613",
    pname: "Shanaya K",
    gender: "Female",
    age: 25,
    regdate: "07-07-2021",
    address: "No 6,Shastri Nagar, Adyar, Chennai-20",
    city: "Chennai",
    pincode: "600020",
    phoneno: "9025503998",
    bloodgrp: "AB+",
    healthcomplaints: ["Weakness", "Clinical depression"],
    recdoctor: ["1"],
    recdepartment: ["Psychiatriy"],
  },
  {
    Regno: "180294",
    pname: " Sara Thakur ",
    gender: "Female",
    age: 34,
    regdate: "05-09-2021",
    address: "No 20,Kasturba Nagar, Adyar, Chennai-19",
    city: "Chennai",
    pincode: "600019",
    phoneno: "6378125763",
    bloodgrp: "B+",
    healthcomplaints: ["Isnomia", "Anemia"],
    recdoctor: ["1", "2"],
    recdepartment: ["Psychiatriy", "General Health"],
  },

  {
    Regno: "120994",
    pname: "Arnav Singh",
    gender: "Male",
    age: 27,
    regdate: "17-11-2020",
    address: "No 15,Velachery, Chennai-96",
    city: "Chennai",
    pincode: "600096",
    phoneno: "67397252587",
    bloodgrp: "O+",
    healthcomplaints: [
      "Fractured tibia",
      "mild injury on head caused due to fall",
    ],
    recdoctor: ["3"],
    recdepartment: ["Orthopaedics"],
  },

  {
    Regno: "131095",
    pname: "Thanvi R",
    gender: "Female",
    age: 18,
    regdate: "07-1-2019",
    address: "No 14,Besant Nagar, Chennai-27",
    city: "Chennai",
    pincode: "600027",
    phoneno: "7549899276",
    bloodgrp: "AB+",
    healthcomplaints: ["Heat stroke"],
    recdoctor: ["4"],
    recdepartment: ["General Health"],
  },
];
let doctors = [
  {
    id: "1",
    dname: "Dhruv Kumar",
    qualification: "MBBS, MD(Psychiatry)",
    patients: ["130613", "180294"],
    department: "1",
  },

  {
    id: "2",
    dname: "Shyam Gupta",
    qualification: "MBBS, MD(General Medicine)",
    patients: ["180294"],
    department: "2",
  },

  {
    id: "3",
    dname: "Karthik S",
    qualification: "MBBS, MS(Orthopaedics)",
    patients: ["120994"],
    department: "3",
  },
  {
    id: "4",
    dname: "Valli P",
    qualification: "MBBS, MS(General Medicine)",
    patients: ["131095"],
    department: "2",
  },
];
let departments = [
  {
    deptno: "1",
    deptname: "Psychiatriy and Psychology",
    doctors: ["1"],
    patients: ["130613", "180294"],
  },
  {
    deptno: "2",
    deptname: "General Health",
    doctors: ["2", "4"],
    patients: ["180294", "131095"],
  },
  {
    deptno: "3",
    deptname: "Orthopaedics",
    doctors: ["3"],
    patients: ["120994"],
  },
];

module.exports = { patients, doctors, departments };
