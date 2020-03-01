const Sequalize = require("sequelize");
const classDB = require("../config/classDB");

const teacherTable = classDB.define("teachers", {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequalize.STRING,
    field: "first_name", //to make underscore in name we are doing this
    allowNull: false
  },
  lastName: {
    type: Sequalize.STRING,
    field: "last_name", //to make underscore in name we are doing this
    allowNull: false
  },
  email: {
    type: Sequalize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  class: Sequalize.STRING,
  subject: {
    type: Sequalize.ENUM,
    values: ["english", "maths", "physics"],
    allowNull: false
  }
});

const newTeacher = [
  {
    firstName: "Manoj",
    lastName: "Balaji",
    email: "test@gmail.com",
    subject: "english"
  },
  {
    firstName: "Manoj",
    lastName: "Balaji",
    email: "test1@gmail.com",
    subject: "english"
  },
  {
    firstName: "Manoj",
    lastName: "Balaji",
    email: "test2@gmail.com",
    subject: "english"
  },
  {
    firstName: "Manoj",
    lastName: "Balaji",
    email: "test3@gmail.com",
    subject: "english"
  },
  {
    firstName: "Manoj",
    lastName: "Balaji",
    email: "test4@gmail.com",
    subject: "english"
  }
];

teacherTable
  .create(newTeacher)
  .then(result => {
    console.log(result.get());
  })
  .catch(console.error);

// creating a table we use sync

teacherTable
  .sync({ force: false })
  .then(() => {
    console.log("Table Created");
    return teacherTable.create(newTeacher);
  })
  .then(result => {
    console.log(result.get());
  })
  .catch(console.error);

//to find a value
teacherTable
  .findOne({
    where: {
      email: "test@gmail.com"
    }
  })
  .then(teacherInstance => {
    console.log(teacherInstance.get());
  })
  .catch(console.error);

teacherTable
  .sync({ force: true })
  .then(() => {
    return teacherTable.bulkCreate(newTeacher, { returning: true });
  })
  .then(result => {
    console.log(result.forEach(item => console.log(item.get())));
  })
  .catch(console.error);
