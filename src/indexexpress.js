const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressHBS = require("express-handlebars");
const path = require("path");
const studentsRouter = require("./Router/studentrouter");
const studentRouter = require("./Router/studentrouter");
const teacherRouter = require("./Router/teacherRouter");
const formatIndex = require("./view/helper/helper");
const student = require("./studentDetail");
const teacherDeatils = require("./teacherDetail");
const ifEquality = require("./view/helper/ifEquality");
const webRouter = require("../src/Router/webRouter");
const adminRouter = require("../src/Router/adminRouter");
const { validateToken } = require("../src/hashing/jwttoken");
const adminAuth = require("./middlewares/adminAuth");

const app = express();

const hbs = expressHBS.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./view/layout"),
  partialsDir: path.join(__dirname, "./view/partial"),
  // teacherDetailLayout: path.join(__dirname, "./view/teacherLayout"),
  // teacherPartial: path.join(__dirname, "/view/teacherPartial"),
  helpers: {
    formatIndex,
    ifEquality
  }
});

//basic config to use handlebars.
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
//including __dirname cuz the following line gets called when code is running
app.set("views", path.join(__dirname, "./view"));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   // res.send("Response from Middleware");
//   req.customKey = "Value set in the middleware";
//   next();
// });

app.get("/", (req, res) => {
  const isLoggedIn = validateToken(req.cookies.jwt);
  res.render("home", {
    layout: "hero",
    pageTitle: "Home",
    isLoggedIn: !!isLoggedIn //truthy or falsy value
  });
});

app.get("/", (req, res) => {
  res.render("home", {
    teacherDetailLayout: "hero",
    pageTitle: "Home"
  });
});

app.get("/teachers", (req, res) => {
  res.render("teacherDeatils", {
    layout: "teacher/navigation",
    pageTitle: "Teachers",
    teacherDeatils
  });
});

app.get("/web/students", (req, res) => {
  res.render("student", {
    layout: "navigation",
    pageTitle: "Students",
    student
  });
});

app.get("/web/add-student", (req, res) => {
  res.render("addstudent", {
    layout: "navigation",
    pageTitle: "Add New Student",
    studentID: student.length + 1
  });
});

app.get("/web/edit-student/:id", (req, res) => {
  const { id = "" } = req.params;
  const requiredStudent = student.find(student => {
    if (parseInt(id) === student.id) return true;
    else return false;
  });
  if (requiredStudent) {
    res.render("addstudent", {
      layout: "navigation",
      pageTitle: "Add New Student",
      studentID: requiredStudent.id,
      mode: "edit",
      student: requiredStudent
    });
  } else {
    res.status(404).send("Not Found");
  }
});

app.use("/students", studentsRouter);

app.use("/student", studentRouter);

app.use("/web", webRouter);

app.use("/admin", adminRouter);

app.use("/teachers", adminAuth, teacherRouter);

// app.get("/students", (req, res) => {
//   /**
//    * Express is smart enough to figure out the
//    * response header's MIME type
//    */
//   // res.send(students);
//   // res.send("<h1>Hello</h1>")

//   /**
//    * Multiple properties of the same object of the express modules
//    * can be chained together
//    */
//   // res.status(200);
//   // res.json({students}); // These two statements can be chained together

//   /**
//    * It's a good practice to be explicit
//    * of the status codes and response types
//    */
//   res.status(200).json({ students });
// });

// app.post("/students", (req, res) => {
//   if (req.body.id && req.body.firstName) {
//     students.push(req.body);
//     res.status(200).json({ message: " Student Created Sucessfully" });
//   } else {
//     res.status(400).send("Bad Request");
//   }
//   res.send("Post method called");
// });

const server = app.listen(3080, () => {
  console.log(`Server running in port ${server.address().port}`);
});
