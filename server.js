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
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answers.title, answers.salary, answers.department_id],
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
        name: "role",
        type: "input",
        message: "Please enter the new employee's role!",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answers.first_name, answers.last_name, answers.role],
        function (err, results) {
          console.table(results);
          startAPP();
          if (err) throw err;
        }
      );
    });
}

// Update Data in Table
function updateData() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Please enter the name of new department!",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (",
        [answers.title, answers.salary, answers.department_id],
        function (err, results) {
          console.table(results);
          startAPP();
          if (err) throw err;
        }
      );
    });
}
