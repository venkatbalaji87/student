const express = require("express");
const studentDetail = require("./studentDetail");
const app = express();

/**
 * Express is sort enough to figure out the
 * response header's mime type (eg: JSON, html)
 */
app.get("/student", (request, response) => {
  response.status(200);
  response.json({ studentDetail });
  /* or mulitple statement can be written together*/
  //response.status(200).json({ student});

  response.send(studentDetail);
  response.send("<h1>Hello</h1>");
});

app.post("/student", (request, response) => {
  console.log(req.body);
  response.send("Post Method called");
});

/**
 * app.get("/student", (request, response) => {
  response.send(studentDetail);
  response.send("<h1>Hello</h1>");
}).get("/"), (req, res) => {
    some response
};
 */

const server = app.listen("8080", () => {
  console.log("Server Running on port : " + server.address().port + " .");
  console.log(`Server Running on Port: ${server.address().port}.`);
});
