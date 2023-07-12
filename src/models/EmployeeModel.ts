import path from "path";
import fs from "fs";

const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'employees.json');

export class EmployeeModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDay: string;
    address: string;
    filePath: string;

    constructor() { }

    // add employees from database
    saveEmployee(employee: EmployeeModel) {
        this.getAllEmployees(employees => {
            employees.push(employee);
            fs.writeFile(dataFilePath, JSON.stringify(employees), err => {
                console.log(err);
            });
            return employees;
        });
    }

    // get all employees from database
    getAllEmployees(callback: ([]: EmployeeModel[]) => void) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                return callback([]);
            }
            return callback(JSON.parse(fileContent.toString()));
        });
    }
}