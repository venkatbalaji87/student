const Sequelize = require("sequelize");
const classDB = require("../config/classDB");
const { generateHashSync } = require("../hashing/hashService");

const adminTable = classDB.define(
  "AdminTable",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    setterMethods: {
      password(plainTextPassword) {
        this.setDataValue("password", generateHashSync(plainTextPassword));
      }
    }
  }
);

const newAdmin = {
  email: "test@gmail.com",
  password: "password!"
};

adminTable
  .sync({ force: true })
  .then(() => {
    console.log("table created");
    return adminTable.create(newAdmin);
  })
  .then(result => {
    console.log(result.get());
  })
  .catch(console.error);

module.exports = adminTable;
