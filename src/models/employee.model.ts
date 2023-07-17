import path from "path";
import fs from "fs";


const dataFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'employees.json');

export class EmployeeModel {

    constructor() { }

    // add employees from database
    saveEmployee(employee: Employee) {
        this.getAllEmployees(employees => {
            // set employee number
            employee.employeeNumber = employees.length + 1;
            employees.push(employee);
            fs.writeFile(dataFilePath, JSON.stringify(employees), err => {
                console.log(err);
            });
            return employees;
        });
    }

    // get all employees from database
    getAllEmployees(callback: ([]: Employee[]) => void) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                return callback([]);
            }
            return callback(JSON.parse(fileContent.toString()));
        });
    }
}