const express = require("express");
const Sequelize = require("sequelize");

const Admin = require("../model/adminaccount");
const adminRouter = express.Router();

const { compareHash } = require("../hashing/hashService");

adminRouter.post("/login", (req, res) => {
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
            res.send("Login Success");
          } else {
            res.send("Invalid User");
          }
        });
      }
    })
    .catch(console.error);
});

module.exports = adminRouter;
