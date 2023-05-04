// * Essential Node.js Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// * Setting Express
const app = express();

// * Custom Modules
// const placeholder = require(`./public/javascript/data.js`);
const dbHandling = require(`./public/javascript/dbHandling.js`);

// ! Fake Log In System
let loggedIn = false;
let username = "officialguy1";
let password = "mesostrongwow0";

// * Setting EJS
app.set('view engine', 'ejs');

// * Enabling body-parsing through POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// * Connecting to DB
mongoose.connect("mongodb://127.0.0.1:27017/barangayDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ModelPerson = mongoose.model("Entry", dbHandling.personSchema);

// * Express Routes
app.get("/", function (req, res) {
  console.log(`GET /`);

  if (!loggedIn) {
    res.redirect("/login");
  }

  ModelPerson.find({}, function (err, people) {
    res.render("pages/home", {
      persons: people
    });
  });

});

app.get("/login", function (req, res) {
  console.log(`GET /log-in`);

  if (loggedIn) {
    res.redirect("/");
  }

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