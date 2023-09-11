import path, { parse } from "path";
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

    // edit employee from database [Rest Parameter]
    editEmployee(updatedEmployee: Employee,...empData: string[]) {
        this.getAllEmployees(employees => {
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].employeeNumber === updatedEmployee.employeeNumber) {

                    employees[i].firstName = updatedEmployee.firstName;
                    employees[i].lastName = updatedEmployee.lastName;
                    employees[i].address = updatedEmployee.address;
                    employees[i].email = updatedEmployee.email;
                    employees[i].filePath = updatedEmployee.filePath;
                    employees[i].fileName = updatedEmployee.fileName;
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

     // sort employee from database
     sortByProperty(propName:string,order: string ,callback: ([]: Employee[]) => void){
        var sortedData: any[] =  [];
            console.log("sort Employee Data" + propName);
            this.getAllEmployees(employees => {
            if(propName === "employeeNumber" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.employeeNumber < b.employeeNumber ? -1 : 1)); 
            }
            else if(propName === "employeeNumber" && order === 'DESC'){

                sortedData = employees.sort((a, b) => (a.employeeNumber > b.employeeNumber ? -1 : 1));
            }
            if(propName === "firstName" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.firstName < b.firstName ? -1 : 1)); 
            }
            else if(propName === "firstName" && order === 'DESC'){

                sortedData = employees.sort((a, b) => (a.firstName > b.firstName ? -1 : 1));
            }
            if(propName === "lastName" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.lastName < b.lastName ? -1 : 1));  
            }
            else if(propName === "lastName" && order === 'DESC'){
                sortedData = employees.sort((a, b) => (a.lastName.toLowerCase().trim() > b.lastName.toLowerCase().trim() ? -1 : 1));
            }
            if(propName === "email" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.email.toLowerCase().trim() < b.email.toLowerCase().trim() ? -1 : 1));  
            }
            else if(propName === "email" && order === 'DESC'){
                sortedData = employees.sort((a, b) => (a.email.toLowerCase().trim() > b.email.toLowerCase().trim() ? -1 : 1));
            }
            if(propName === "joiningDate" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.joiningDate.toLowerCase().trim() < b.joiningDate.toLowerCase().trim() ? -1 : 1));  
            }
            else if(propName === "joiningDate" && order === 'DESC'){
                sortedData = employees.sort((a, b) => (a.joiningDate.toLowerCase().trim() > b.joiningDate.toLowerCase().trim() ? -1 : 1));
            }
            if(propName === "gender" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.gender.toLowerCase().trim() < b.gender.toLowerCase().trim() ? -1 : 1));  
            }
            else if(propName === "gender" && order === 'DESC'){
                sortedData = employees.sort((a, b) => (a.gender.toLowerCase().trim() > b.gender.toLowerCase().trim() ? -1 : 1));
            }
            if(propName === "department" && order === 'ASC')
            {
                sortedData = employees.sort((a, b) => (a.department.toLowerCase().trim() < b.department.toLowerCase().trim() ? -1 : 1));  
            }
            else if(propName === "department" && order === 'DESC'){
                sortedData = employees.sort((a, b) => (a.department.toLowerCase().trim() > b.department.toLowerCase().trim() ? -1 : 1));
            }
            return callback(sortedData);
        });
    }

    sortEmployeeData<T>(array: T[], propName: keyof T, order: 'ASC' | 'DESC'): void {
        array.sort((a, b) => {
            if (a[propName] < b[propName]) {
                return -1;
            }

            if (a[propName] > b[propName]) {
                return 1;
            }
            return 0;
        });

        if (order === 'DESC') {
            array.reverse();
        }
    }
}