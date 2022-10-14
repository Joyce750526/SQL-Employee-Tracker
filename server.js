// Adding dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",

    // MySQL Username
    user: "root",

    // Port
    port:3306,

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
          "Finished"
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
      } else (response.userChoice === "Finished") {
        finished();
      };
    })
}
// Another Way to switch to each case
// //* Define functions for each switch case *//
// const searchEmp = () => {
//   connection.query(queryEmpsInfo, (err, res) => {
//       if (err) throw err;
//       console.log(`\n\n\n
//       *** Viewing all ${res.length} Employees *** \n`);
//       console.table(res);
//   });
//   init();
// };

// Function call to initialize app
startAPP();

// View All Department
function viewDepartment() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    if (err) throw err;
  });
  console.log("View employees by department");

  inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            let choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].name);
            }
            return choiceArr;
          },
          message: "Please select a department!",
        },
      ])
      .then(function (answer) {
        connection.query(
          "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name =?",
          [answer.choice],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            startAPP();
          }
        );
      });
  };


// View All Roles
function viewRoles() {// Query database
  db.query('SELECT * FROM role', function (err, results) {
  });
  console.log("View all roles");
  if (err) throw err;
    // once you have the roles, prompt user for which they chose
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var choiceArr = [];
            for (i = 0; i < results.length; i++) {
              choiceArr.push(results[i].title);
            }
            return choiceArr;
          },
          message: "Please select a role!",
        },
      ])
      .then(function (answer) {
        console.log(answer.choice);
        connection.query(
          "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE e.role_id =?",
          [answer.choice],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            startAPP();
          }
        );
      });
  };
// View All Employees
function viewEmployees() {// Query database
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
  });
  console.log("View employees by department");
  startAPP();
}

// Add A Department
function addDepartment(){
  inquirer.prompt([
    {
      name:"newDepartment",
      type:"input",
      message:"Please enter the name of new department!"
    }
  ])
  .then((answers)=>{
    connection.query
    console.log(answer.choice);
        connection.query(
          "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE e.role_id =?",
          [answer.choice],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            startAPP();
  })
  INSERT INTO department (name, 1)
  VALUES (1, "apple");
}

// Add A Role
function addRole(){
  INSERT INTO role (name, 1)
  VALUES (1, "apple");
}

// Add An Employee
function addEmployee(){
  INSERT INTO employee(name, 1)
  VALUES (1, "apple");
}

// Update Data in Table
function updateEmployee(){
  INSERT INTO employee (name, 1)
  VALUES (1, "apple");
}
