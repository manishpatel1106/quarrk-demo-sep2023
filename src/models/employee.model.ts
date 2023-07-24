import path from "path";
import fs from "fs";
import { dataFilePath } from '../functions/common.functions';

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

    // get selected employee from database
    getSelectedEmployee(employeeNo: number, callback: (selectedEmp: Employee) => void) {

        this.getAllEmployees(employees => {
            // set employee number
            var selectedEmp = employees.find(({ employeeNumber }) => employeeNumber == employeeNo);
            return callback(selectedEmp);
        });
    }

    // edit employee from database
    editEmployee(updatedEmployee: Employee) {
        this.getAllEmployees(employees => {
            // set employee number
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].employeeNumber === updatedEmployee.employeeNumber) {

                    employees[i].firstName = updatedEmployee.firstName;
                    employees[i].lastName = updatedEmployee.lastName;
                    employees[i].address = updatedEmployee.address;
                    employees[i].email = updatedEmployee.email;
                    employees[i].filePath = updatedEmployee.filePath;
                    employees[i].phoneNumber = updatedEmployee.phoneNumber;
                    employees[i].gender = updatedEmployee.gender;
                    employees[i].department = updatedEmployee.department;
                    employees[i].joiningDate = updatedEmployee.joiningDate;
                }
            }

            fs.writeFile(dataFilePath, JSON.stringify(employees), err => {
                console.log(err);
            });
            return employees;
        });
    }

}