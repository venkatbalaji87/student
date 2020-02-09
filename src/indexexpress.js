const express = require("express");
const bodyParser = require("body-parser");
const studentsF = require("./studentDetail");
const studentsRouter = require("./Router/studentrouter");
const studentRouter = require("./Router/studentrouter");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // res.send("Response from Middleware");
//   req.customKey = "Value set in the middleware";
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/students", studentsRouter);

app.use("/student", studentRouter);

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

const server = app.listen(9000, () => {
  console.log(`Server running in port ${server.address().port}`);
});
