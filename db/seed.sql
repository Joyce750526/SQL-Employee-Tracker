USE department_db;

INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Tech");
INSERT INTO department (name)
VALUES ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Back-End Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Office Manager", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 180000, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "Martin", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Lori", "Jones", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kate", "Jacobs", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Lee", "Codes", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joyce", "Chen", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Leeve", "Canton", 4);
