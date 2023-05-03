//jshint esversion:6

// * Essential Node.js Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// * Setting Express
const app = express();

// * Custom Modules
const placeholder = require(`./public/javascript/data.js`);
const dbHandling = require(`./public/javascript/dbHandling.js`);

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

const ModelPerson = mongoose.model("Person", dbHandling.personSchema);

app.get("/", function (req, res) {
  console.log(`HOMEEE`);
  // Person.find({}, function (err, people) {
    console.log(placeholder.persons);
    res.render("pages/home", {
      // startingContent: homeStartingContent,
      persons: placeholder.persons
    });
  // });
});

app.get("/add", function (req, res) {
  console.log(`GET add`);
  res.render("pages/add");
});

// app.post("/add", function (req, res) {
//   console.log(`POST add`);
//   const person = new Person({
//     name: {
//       // last: req.body.nameLast,
//       first: req.body.nameFirst,
//       middle: req.body.nameMiddle,
//       nickname: req.body.nameNickname,
//       suffix: req.body.nameSuffix,
//     },
//     birthdate: req.body.birthdate,
//     age: req.body.age,
//     gender: req.body.gender,
//     legalGuardian: {
//       last: req.body.legalNameLast,
//       first: req.body.legalNameFirst,
//       middle: req.body.legalNameMiddle,
//       nickname: req.body.legalNameNickname,
//       suffix: req.body.legalNameSuffix,
//     },
//     legalGuardianContact: req.body.legalGuardianContact,
//   });

//   console.log(person);

//   person.save(function (err) {
//     console.log(`save person`);
//     if (!err) {
//       console.log(`workkkk`);
//       res.redirect("/");
//     }
//   });
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});