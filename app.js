//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/barangayDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const nameSchema = {
  last: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true,
  },
  middle: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    required: false,
  },
}

const addressSchema = {
  lot: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true,
  },
  barangay: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
}

const academicSchema = {
  lastSchool: {
    type: String,
    required: true
  },
  lastSchoolAttendance: {
    type: Date,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  outOfSchoolDuration: {
    type: String,
    required: true
  },
  expectedLevel: {
    type: String,
    required: true
  }
}

const personSchema = {
  name: {
    type: nameSchema,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  // address: {
  //   type: addressSchema,
  //   required: true,
  // },
  legalGuardian: {
    type: nameSchema,
    required: true,
  },
  legalGuardianContact: {
    type: String,
    required: true,
  },
  // academics: {
  //   type: academicSchema,
  //   required: true,
  // }
}

const Person = mongoose.model("Person", personSchema);

app.get("/", function (req, res) {
  console.log(`HOMEEE`);
  Person.find({}, function (err, people) {
    console.log(people);
    res.render("home", {
      // startingContent: homeStartingContent,
      people: people
    });
  });
});

app.get("/add", function (req, res) {
  console.log(`GET add`);
  res.render("add");
});

app.post("/add", function (req, res) {
  console.log(`POST add`);
  const person = new Person({
    name: {
      // last: req.body.nameLast,
      first: req.body.nameFirst,
      middle: req.body.nameMiddle,
      nickname: req.body.nameNickname,
      suffix: req.body.nameSuffix,
    },
    birthdate: req.body.birthdate,
    age: req.body.age,
    gender: req.body.gender,
    legalGuardian: {
      last: req.body.legalNameLast,
      first: req.body.legalNameFirst,
      middle: req.body.legalNameMiddle,
      nickname: req.body.legalNameNickname,
      suffix: req.body.legalNameSuffix,
    },
    legalGuardianContact: req.body.legalGuardianContact,
  });

  console.log(person);

  person.save(function (err) {
    console.log(`save person`);
    if (!err) {
      console.log(`workkkk`);
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});