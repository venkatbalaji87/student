const Sequelize = require("sequelize");
const classDB = require("../config/classDB");
const teacherDetails = require("../model/teacherDetails");

const StudentTable = classDB.define("NewStudents", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: "first_name", //to make underscore in name we are doing this
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    field: "last_name", //to make underscore in name we are doing this
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM,
    values: ["male", "female"],
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    field: "age",
    allowNull: false
  },
  teacherId: {
    type: Sequelize.INTEGER,
    field: "teacher_id",
    allowNull: false,
    references: {
      model: teacherDetails,
      key: "id",
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const newStudent = {
  firstName: "Dani",
  lastName: "Akash",
  gender: "male",
  age: "14",
  teacherId: 1
};

StudentTable.sync({ force: false })
  .then(() => {
    console.log("table created");
    return StudentTable.create(newStudent);
  })
  .then(result => {
    console.log(result.get());
  })
  .catch(console.error);

module.exports = StudentTable;
