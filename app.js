// * Essential Node.js Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// * MySQL Setup
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

// * Activating Express
const app = express();

// * Activating EJS
app.set('view engine', 'ejs');

// * Enabling body-parsing through POST
// -* Makes form submissions work
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// * Custom Modules
// -* dbHandling defines the database rules
const dbHandling = require(`./public/javascript/dbHandling.js`);

// * Connecting to Remote Database
// mongoose.connect("mongodb+srv://admin-kolehiyolo:amazing@cluster0.ys8lv.mongodb.net/barangayDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true`
// });

// * Connecting to Local Database
mongoose.connect("mongodb://127.0.0.1:27017/barangayDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ! Log In
let loggedIn = true;
let username = "brgyOfficial";
let password = "pasayCity";

// * Defining Collections
// -* Entry is collection name
// -* dbHandling.personSchema is collection rules
const ModelPerson = mongoose.model("Entry", dbHandling.personSchema);

// * Express Routes
app.get("/", function (req, res) {
  console.log(`GET /`);

  if (!loggedIn) {
    console.log(`User isn't logged in. Redirect to GET /log-in`);
    res.redirect("/login");
  }

  // -* First, find all documents in the ModelPerson collection
  // -* Store all documents into "people" variable
  // -* Pass "home" page to browser/user
  // -* Pass data in "people" to browser/user
  // ModelPerson.find({}, (err, peopleFetched) => {
  //   res.render("pages/home", {
  //     peopleExpected: peopleFetched
  //   });
  // });

  async function getEntries(runMe) {
    const [rows] = await pool.query("SELECT * FROM entries");
    runMe(rows);
    return rows;
  }

  getEntries((result) => {
    console.log(result);
    res.render("pages/home", {
      peopleExpected: result
    });
  });
});

app.get("/about", function (req, res) {
  console.log(`GET /about`);

  if (!loggedIn) {
    console.log(`User isn't logged in. Redirect to GET /log-in`);
    res.redirect("/login");
  }

  res.render("pages/about", {
    // peopleExpected: result
  });
});

app.get("/deleted", function (req, res) {
  console.log(`GET /`);

  if (!loggedIn) {
    console.log(`User isn't logged in. Redirect to GET /log-in`);
    res.redirect("/login");
  }

  // -* First, find all documents in the ModelPerson collection
  // -* Store all documents into "people" variable
  // -* Pass "home" page to browser/user
  // -* Pass data in "people" to browser/user
  // ModelPerson.find({}, (err, peopleFetched) => {
  //   res.render("pages/home", {
  //     peopleExpected: peopleFetched
  //   });
  // });

  async function getEntries(runMe) {
    const [rows] = await pool.query("SELECT * FROM deletedEntries");
    runMe(rows);
    return rows;
  }

  getEntries((result) => {
    console.log(result);
    res.render("pages/deleted", {
      peopleExpected: result
    });
  });
});

app.get("/search/:input", function (req, res) {
  console.log(`GET /search/${req.params.input}`);

  if (!loggedIn) {
    console.log(`User isn't logged in. Redirect to GET /log-in`);
    res.redirect("/login");
  }

  // -* First, find all documents in the ModelPerson collection
  // -* Store all documents into "people" variable
  // -* Pass "home" page to browser/user
  // -* Pass data in "people" to browser/user
  // ModelPerson.find({
  //   $or: [{
  //       "name.last": {
  //         "$regex": req.params.input,
  //         "$options": "i"
  //       },
  //     },
  //     {
  //       "name.first": {
  //         "$regex": req.params.input,
  //         "$options": "i"
  //       }
  //     },
  //   ]
  // }, (err, peopleFetched) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(peopleFetched);
  //     res.render("pages/home", {
  //       peopleExpected: peopleFetched
  //     });
  //   }
  // });

  async function getEntry(runMe, id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM entries
    WHERE nameLast = ?
    OR nameFirst = ?
    `, [id, id]);
    runMe(rows);
  }

  getEntry((result) => {
    console.log(result);
    res.render("pages/home", {
      peopleExpected: result
    });
  }, req.params.input);
});

app.post("/search", function (req, res) {
  console.log(`POST /search`);

  if (!loggedIn) {
    console.log(`User isn't logged in. Redirect to GET /log-in`);
    res.redirect("/login");
  }

  // -* First, find all documents in the ModelPerson collection
  // -* Store all documents into "people" variable
  // -* Pass "home" page to browser/user
  // -* Pass data in "people" to browser/user
  res.redirect(`/search/${req.body.search}`);
});

app.get("/login", function (req, res) {
  console.log(`GET /log-in`);

  if (loggedIn) {
    res.redirect("/");
  }

  // -* Pass "login" page to browser/user
  // -* Pass "failedLogin" as false since this is user's initial login attempt
  res.render("pages/login", {
    failedLogin: false
  });
});

app.get("/register", function (req, res) {
  console.log(`GET /register`);

  res.render("pages/register");
});

app.post("/register", function (req, res) {
  console.log(`POST /register`);

  res.redirect("/");
});

app.post("/login", function (req, res) {
  console.log(`POST /log-in`);

  if (
    username === req.body.username &&
    password === req.body.password
  ) {
    console.log(`PASS going to home`);
    loggedIn = true;
    res.redirect("/");
  } else {
    console.log(`FAIL`);
    res.render("pages/login", {
      failedLogin: true
    });
  }
});

app.get("/logout", function (req, res) {
  console.log(`GET /log-out`);

  loggedIn = false;
  res.redirect("/");
});

app.get("/add", function (req, res) {
  console.log(`GET /add`);

  if (!loggedIn) {
    res.redirect("/login");
  }

  res.render("pages/add");
});

app.post("/add", function (req, res) {
  console.log(`POST /add`);

  if (!loggedIn) {
    res.redirect("/login");
  }

  // * Create new document "person" for the "ModelPerson"/"Entries" collection
  // const person = new ModelPerson({
  //   name: {
  //     last: req.body.nameLast,
  //     first: req.body.nameFirst,
  //     middle: req.body.nameMiddle,
  //     suffix: req.body.nameSuffix,
  //     nickname: req.body.nameNickname,
  //   },
  //   image: req.body.image,
  //   birthdate: req.body.birthdate,
  //   sex: req.body.sex,
  //   legalGuardian: {
  //     last: req.body.legalNameLast,
  //     first: req.body.legalNameFirst,
  //     middle: req.body.legalNameMiddle,
  //     suffix: req.body.legalNameSuffix,
  //     nickname: req.body.legalNameNickname,
  //   },
  //   legalGuardianContact: req.body.legalGuardianContact,
  //   address: {
  //     unit: req.body.addressUnit,
  //     lot: req.body.addressLot,
  //     street: req.body.addressStreet,
  //     remarks: req.body.addressRemarks,
  //   },
  //   academic: {
  //     lastSchool: req.body.academicLastSchool,
  //     lastSchoolAttendance: req.body.academicLastSchoolAttendance,
  //     lastLevel: req.body.academicLastLevel,
  //   }
  // });

  const info = {
    nameLast: req.body.nameLast,
    nameFirst: req.body.nameFirst,
    nameMiddle: req.body.nameMiddle,
    nameSuffix: req.body.nameSuffix,
    nameNick: req.body.nameNick,
    image: req.body.image,
    birthdate: req.body.birthdate,
    sex: req.body.sex,
    legalGuardianLast: req.body.legalGuardianLast,
    legalGuardianFirst: req.body.legalGuardianFirst,
    legalGuardianMiddle: req.body.legalGuardianMiddle,
    legalGuardianSuffix: req.body.legalGuardianSuffix,
    legalGuardianNick: req.body.legalGuardianNick,
    legalGuardianContact: req.body.legalGuardianContact,
    addressUnit: req.body.addressUnit,
    addressLot: req.body.addressLot,
    addressStreet: req.body.addressStreet,
    addressRemarks: req.body.addressRemarks,
    academicLastSchool: req.body.academicLastSchool,
    academicLastSchoolAttendance: req.body.academicLastSchoolAttendance,
    academicLastLevel: req.body.academicLastLevel
  }

  // * Put "person" document into "ModelPerson"/"Entries" collection
  // * Redirect to "GET /" once successful
  // ModelPerson.collection.insertOne(person, (err) => {
  //   if (!err) {
  //     console.log(`Save Data:`);
  //     console.log(person);
  //     res.redirect("/");
  //   }
  // });

  // async function getEntry(runMe, id) {
  //   const [rows] = await pool.query(`
  //   SELECT * 
  //   FROM entries
  //   WHERE nameLast = ?
  //   OR nameFirst = ?
  //   `, [id, id]);
  //   runMe(rows);
  // }

  // getEntry((result) => {
  //   console.log(result);
  //   res.render("pages/home", {
  //     peopleExpected: result
  //   });
  // }, req.params.input);

  async function createEntry(runMe, info) {
    const [result] = await pool.query(`
    INSERT INTO entries (nameLast, nameFirst, nameMiddle, nameSuffix, nameNick, image, birthdate, sex, legalGuardianLast, legalGuardianFirst, legalGuardianMiddle, legalGuardianSuffix, legalGuardianNick, legalGuardianContact, addressUnit, addressLot, addressStreet, addressRemarks, academicLastSchool, academicLastSchoolAttendance, academicLastLevel )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      info.nameLast,
      info.nameFirst,
      info.nameMiddle,
      info.nameSuffix,
      info.nameNick,
      info.image,
      info.birthdate,
      info.sex,
      info.legalGuardianLast,
      info.legalGuardianFirst,
      info.legalGuardianMiddle,
      info.legalGuardianSuffix,
      info.legalGuardianNick,
      info.legalGuardianContact,
      info.addressUnit,
      info.addressLot,
      info.addressStreet,
      info.addressRemarks,
      info.academicLastSchool,
      info.academicLastSchoolAttendance,
      info.academicLastLevel
    ]);

    console.log(`RESULT:`);
    console.log(result);
    runMe(result);
  }

  createEntry((result) => {
    console.log(result);
    res.redirect("/");
  }, info);
});

app.get("/delete/:entryId", function (req, res) {
  console.log(`GET /delete/${req.params.entryId}`);

  if (!loggedIn) {
    res.redirect("/login");
  }

  const requestedEntryId = req.params.entryId;

  // res.send(`GET /delete/${requestedEntryId}`);

  // * Locate document inside "ModelPerson"/"Entries" collection
  // * Once found, remove from collection
  // * Redirect to "GET /" once successful
  ModelPerson.deleteOne({
    _id: requestedEntryId
  }, (err) => {
    if (!err) {
      console.log(err);
      res.redirect("/");
    }
  });

  async function deleteEntry(runMe, id) {
    await pool.query(`
    INSERT INTO deletedEntries
    SELECT *
    FROM entries
    WHERE id=?
    `, [id, id]);

    const [rows] = await pool.query(`
    DELETE
    FROM entries
    WHERE id=?
    `, [id]);
    runMe(rows);
  }

  deleteEntry((result) => {
    console.log(result);
    res.redirect("/");
  }, requestedEntryId);
});

app.get("/permadelete/:entryId", function (req, res) {
  console.log(`GET /delete/${req.params.entryId}`);

  if (!loggedIn) {
    res.redirect("/login");
  }

  const requestedEntryId = req.params.entryId;

  // res.send(`GET /delete/${requestedEntryId}`);

  // * Locate document inside "ModelPerson"/"Entries" collection
  // * Once found, remove from collection
  // * Redirect to "GET /" once successful
  ModelPerson.deleteOne({
    _id: requestedEntryId
  }, (err) => {
    if (!err) {
      console.log(err);
      res.redirect("/");
    }
  });

  async function deleteEntry(runMe, id) {
    const [rows] = await pool.query(`
    DELETE
    FROM deletedEntries
    WHERE id=?
    `, [id]);
    runMe(rows);
  }

  deleteEntry((result) => {
    console.log(result);
    res.redirect("/deleted");
  }, requestedEntryId);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log(`\n`);
  console.log(`Server started on port ${port}`);
});