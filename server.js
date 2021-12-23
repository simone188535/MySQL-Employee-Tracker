const express = require("express");
const inquirer = require("inquirer");
const util = require("util");
require("console.table");

const db = require("./db-connection");
const queryPromise = util.promisify(db.query).bind(db);
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const viewAllEmployee = async () => {
  try {
    const allEmployeeQuery = await queryPromise(
        `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
        FROM employee m RIGHT JOIN
        employee e ON m.id = e.manager_id
        INNER JOIN role ON e.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id`);
    console.table(allEmployeeQuery);
  } catch (err) {
    throw err;
  }
};

const addEmployee = async () => {
    try {
        const allManagersQuery = await queryPromise("SELECT * FROM employee WHERE manager_id IS NULL;");
        const allRoleQuery = await queryPromise("SELECT * FROM role;");

        const allRoleNames = allRoleQuery.map(
            (department) => department.title
          );

        const FirstAndLastName = allManagersQuery.map(
            (name) => `${name.first_name} ${name.last_name}`
        );
   
        const { employeeFirstName, employeeLastName, whichRole, whichManager } = await inquirer.prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "employeeFirstName",
            },
            {
              type: "input",
              message: "What is the employee's last name?",
              name: "employeeLastName",
            },
            {
              type: "list",
              message: "Which is the employee's role?",
              pageSize: allRoleNames.length,
              choices: allRoleNames,
              name: "whichRole",
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                pageSize: FirstAndLastName.length,
                choices: FirstAndLastName,
                name: "whichManager",
              },
          ]);

        const splitFirstAndLastName = whichManager.split(' ');
        const findManagerQueryObj = allManagersQuery.find(
        (element) => element.first_name === splitFirstAndLastName[0] && element.last_name === splitFirstAndLastName[1]
        );

        const findRoleQueryObj = allRoleQuery.find(
        (element) => element.title === whichRole
        );

        const addEmployeeQuery = await queryPromise(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)`,
          [employeeFirstName, employeeLastName, findRoleQueryObj.id, findManagerQueryObj.id]
        );
        console.table(addEmployeeQuery);
      } catch (err) {
        throw err;
      }
};

const updateEmployeeRole = () => {};

// complete
const viewAllRoles = async () => {
  try {
    const allRolesQuery = await queryPromise(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id;"
    );
    console.table(allRolesQuery);
  } catch (err) {
    throw err;
  }
};

// complete
const addRole = async () => {
  try {
    const allDepartmentQuery = await queryPromise("SELECT * FROM department;");
    const departmentNames = allDepartmentQuery.map(
      (department) => department.name
    );

    const { roleName, roleSalary, whichRole } = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        pageSize: departmentNames.length,
        choices: departmentNames,
        name: "whichRole",
      },
    ]);

    const findRoleQueryObj = allDepartmentQuery.find(
      (element) => element.name === whichRole
    );

    await queryPromise(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
      [roleName, roleSalary, findRoleQueryObj.id]
    );
    console.log(`Added ${roleName} to database.`);
  } catch (err) {
    throw err;
  }
};

// complete
const viewAllDepartment = async () => {
  try {
    const allDepartmentQuery = await queryPromise("SELECT * FROM department;");
    console.table(allDepartmentQuery);
  } catch (err) {
    throw err;
  }
};

// correct
const addDepartment = async () => {
  try {
    const { departmentName } = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
      },
    ]);

    await queryPromise(
      "INSERT INTO department (name) VALUES (?);",
      departmentName
    );
    console.log(`Added ${departmentName} to database.`);
  } catch (err) {
    throw err;
  }
};

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
        return allUserOptions();
      }

      case "Add Employee": {
        await addEmployee();
        return allUserOptions();
      }

      case "Update Employee Role": {
        await updateEmployeeRole();
        return allUserOptions();
      }
      case "View All Roles": {
        await viewAllRoles();
        return allUserOptions();
      }
      case "Add Role": {
        await addRole();
        return allUserOptions();
      }
      case "View All Department": {
        await viewAllDepartment();
        return allUserOptions();
      }
      case "Add Department": {
        await addDepartment();
        return allUserOptions();
      }

      default:
        // quit program
        return process.exit(1);
    }
  } catch (err) {
    throw err;
  } finally {
    console.log("\n");
  }
};

allUserOptions();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
