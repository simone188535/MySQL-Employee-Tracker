const express = require("express");
const inquirer = require("inquirer");
const db = require("./db-connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const viewAllEmployee = () => {};

const addEmployee = () => {};

const updateEmployeeRole = () => {};

const viewAllRoles = () => {};

const addRole = () => {};

const viewAllDepartment = () => {};

const addDepartment = () => {};

const allUserOptions = async () => {
  try {
    const { whatWouldYouLikeToDo } = await inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        pageSize: 7,
        choices: [
          "View All Employee",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Department",
          "Add Department",
          "Quit",
        ],
        name: "whatWouldYouLikeToDo",
      },
    ]);

    switch (whatWouldYouLikeToDo) {
      case "View All Employee": {
        viewAllEmployee();
        break;
      }

      case "Add Employee": {
        addEmployee();
        break;
      }

      case "Update Employee Role": {
        updateEmployeeRole();
        break;
      }
      case "View All Roles": {
        viewAllRoles();
        break;
      }
      case "Add Role": {
        addRole();
        break;
      }
      case "View All Department": {
        viewAllDepartment();
        break;
      }
      case "Add Department": {
        addDepartment();
        break;
      }

      default:
        return;
    }
  } catch (err) {
    throw err;
  }
};

allUserOptions();

// Query database

let deletedRow = 2;
// db.query(`DELETE FROM favorite_books WHERE  ? OR ?`, [{id: 2 }, { id: 6 }], (err, result) => {
db.query(
  `DELETE FROM favorite_books WHERE id = ?`,
  deletedRow,
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  }
);

// Query database
db.query("SELECT * FROM favorite_books", function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
