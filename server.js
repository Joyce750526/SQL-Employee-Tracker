const mysql = require("mysql2");
const inquirer = require("inquirer");
const { default: Choice } = require("inquirer/lib/objects/choice");


// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "password",
    database: "department_db",
  },
  console.log(`Connected to the department_db database.`)
);

function startAPP() {
  inquirer.prompt([
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
      ],
    },
  ])
  .then((response) => {
    console.log(response);
  });
};
// Function call to initialize app
startAPP();
