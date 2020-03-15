const express = require("express");
// const Sequelize = require("sequelize");

const Admin = require("../model/adminaccount");
const adminRouter = express.Router();
const { createToken } = require("../hashing/jwttoken");
const { compareHash } = require("../hashing/hashService");

adminRouter
  .post("/login", (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({
      where: { email }
    })
      .then(result => {
        if (!result) {
          res.send("Invalid User");
        } else {
          const { password: passwordHash } = result.get();
          compareHash(password, passwordHash).then(result => {
            if (result) {
              // Crafting jwt cookie
              const jwtToken = createToken({
                sub: "admin",
                email
              });
              res.cookie("jwt", jwtToken, { httpOnly: true });
              res.redirect("/");
              console.log(jwtToken);
              res.send("Login Success");
            } else {
              res.send("Invalid User");
            }
          });
        }
      })
      .catch(console.error);
  })
  .get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  });

module.exports = adminRouter;
