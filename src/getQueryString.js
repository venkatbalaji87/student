const url = require("url"); //module which is used commonly to other files
const getQueryString = urlString => {
  try {
    return url.parse(urlString, true).query;
    console.log("test");
  } catch (e) {
    console.error(e);
    return {};
  }
};

module.exports = getQueryString;
