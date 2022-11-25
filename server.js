// Adding dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",

    // MySQL Username
    user: "root",

    // Port
    port: 3306,

    // Add MySQL Password Here
    password: "password",
    database: "department_db",
  },
  console.log(`Connected to the department_db database.`)
);

// const queryPromise = (statement, params) => {
//   return new Promise((resolve, reject) => {
//     db.query(statement, params, (err, result) => {
//       if (err) {
//         return reject(err);
//       }

//       return resolve(result);
//     });
//   });
// };

function startAPP() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee manager",
          "Finished",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      if (response.userChoice === "View all departments") {
        viewDepartment();
      } else if (response.userChoice === "View all roles") {
        viewRoles();
      } else if (response.userChoice === "View all employees") {
        viewEmployees();
      } else if (response.userChoice === "Add a department") {
        addDepartment();
      } else if (response.userChoice === "Add a role") {
        addRole();
      } else if (response.userChoice === "Add an employee") {
        addEmployee();
      } else if (response.userChoice === "Update an employee role") {
        updateRole();
      } else if (response.userChoice === "Update an employee manager") {
        updateEmployeeManager();
      } else {
        finished();
      }
    });
}

// Function call to initialize app
startAPP();

// View All Department
function viewDepartment() {
  // Query database
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    startAPP();
    if (err) throw err;
  });
  console.log("View employees by department");
}

// View All Roles
function viewRoles() {
  // Query database
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    console.log("View all roles");
    startAPP();
    if (err) throw err;
  });
}
// View All Employees
function viewEmployees() {
  // Query database
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    console.log("View employees by department");
    startAPP();
    if (err) throw err;
  });
}

// Add A Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please enter the name of new department!",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.newDepartment,
        function (err, results) {
          console.table(results);
          startAPP();
          if (err) throw err;
        }
      );
    });
}

// Add A Role
function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Please enter the name of new role!",
      },
      {
        name: "newSalary",
        type: "input",
        message: "Please enter the salary of new role!",
      },
      {
        name: "newID",
        type: "input",
        message: "Please enter the department ID!",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answers.newRole, answers.newSalary, answers.newID],
        function (err, results) {
          console.table(results);
          startAPP();
          if (err) throw err;
        }
      );
    });
}

// Add An Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please enter the new employee's first name!",
      },
      {
        name: "last_name",
        type: "input",
        message: "Please enter the new employee's last name!",
      },
      {
        name: "role_id",
        type: "input",
        message: "Please enter the department ID!",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)",
        [answers.first_name, answers.last_name, answers.role_id],
        function (err, results) {
          console.table(results);
          startAPP();
          if (err) throw err;
        }
      );
    });
}

// Update an Employee's Role
// function updateRole() {
//   inquirer
//     .prompt([
//       {
//         name: "first_name",
//         type: "list",
//         message: "Please enter the new role of the employee!",
//         choices: async function () {
//           const results = await queryPromise(
//             "SELECT id AS value, title AS name FROM role"
//           );
//           return results;
//         },
//       },
//       {
//         name: "role_id",
//         type: "list",
//         message: "Please enter the new title of the employee!",
//         choices: async function () {
//           const results = await queryPromise(
//             "SELECT id AS value, title AS name FROM role"
//           );
//           return results;
//         },
//       },
//     ])
//     .then((answers) => {
//       db.query(
//         "UPDATE employee SET role_id=? WHERE first_name=?",
//         [answers.roleUpdate, answers.idUpdate],
//         function (err, results) {
//           console.table(results);
//           startAPP();
//           if (err) throw err;
//         }
//       );
//     });
// }

// Update employee role
function updateRole() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message:
          "Please enter the first name of the employee you like to update!",
      },
      {
        name: "role_id",
        type: "number",
        message:
          "Please enter the new role ID of the employee you like to update!",
      },
    ])
    .then(function (answers) {
      db.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [answers.role_id, answers.first_name],
        function (err, results) {
          if (err) throw err;
          console.log("results");

          db.query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err;
            console.table(results);
            startAPP();
          });
        }
      );
    });
}

// Update Employee Manager ID
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message:
          "Please enter the first name of the employee you like to update!",
      },
      {
        name: "manager_id",
        type: "number",
        message:
          "Please enter the new manager's ID of the employee you like to update!",
      },
    ])
    .then(function (answers) {
      db.query(
        "UPDATE employee SET manager_id = ? WHERE first_name = ?",
        [answers.manager_id, answers.first_name],
        function (err, results) {
          if (err) throw err;
          db.query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err;
            console.table(results);
            startAPP();
          });
        }
      );
    });
}

function finished() {
  process.exit()
}
