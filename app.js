// * Essential Node.js Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

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

// * Connecting to Database
mongoose.connect("mongodb://127.0.0.1:27017/barangayDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ! Fake Log In System
let loggedIn = true;
let username = "officialguy1";
let password = "mesostrongwow0";

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
  ModelPerson.find({}, (err, peopleFetched) => {
    res.render("pages/home", {peopleExpected: peopleFetched});
  });
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
  const person = new ModelPerson({
    name: {
      last: req.body.nameLast,
      first: req.body.nameFirst,
      middle: req.body.nameMiddle,
      suffix: req.body.nameSuffix,
      nickname: req.body.nameNickname,
    },
    image: req.body.image,
    birthdate: req.body.birthdate,
    sex: req.body.sex,
    legalGuardian: {
      last: req.body.legalNameLast,
      first: req.body.legalNameFirst,
      middle: req.body.legalNameMiddle,
      suffix: req.body.legalNameSuffix,
      nickname: req.body.legalNameNickname,
    },
    legalGuardianContact: req.body.legalGuardianContact,
    address: {
      unit: req.body.addressUnit,
      lot: req.body.addressLot,
      street: req.body.addressStreet,
      remarks: req.body.addressRemarks,
    },
    academic: {
      lastSchool: req.body.academicLastSchool,
      lastSchoolAttendance: req.body.academicLastSchoolAttendance,
      lastLevel: req.body.academicLastLevel,
    }
  });

  // * Put "person" document into "ModelPerson"/"Entries" collection
  // * Redirect to "GET /" once successful
  ModelPerson.collection.insertOne(person, (err) => {
    if (!err) {
      console.log(`Save Data:`);
      console.log(person);
      res.redirect("/");
    }
  });
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
});

app.listen(3000, function () {
  console.log(`\n`);
  console.log("Server started on port 3000");
});