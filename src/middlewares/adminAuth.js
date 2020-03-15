const { validateToken } = require("../hashing/jwttoken");

const adminAuth = (req, res, next) => {
  const { jwt = "" } = req.cookies;
  const admin = validateToken(jwt);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = adminAuth;
