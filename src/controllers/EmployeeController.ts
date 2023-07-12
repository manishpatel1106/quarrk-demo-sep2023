import express from "express";
import { EmployeeModel } from '../models/EmployeeModel';

let employeemodel = new EmployeeModel();
export class EmployeeController {
    constructor() {
        employeemodel = new EmployeeModel();
    }


    getAllEmployees = (request: express.Request, response: express.Response) => {
        employeemodel.getAllEmployees(employees => {
            response.render(
                "employee/employees",
                { employees: employees }
            );
        });
    }

    addEmployee = (request: express.Request, response: express.Response) => {
        let employee = new EmployeeModel();
        let test = request.body.email;
        //console.log(request);
        employee.firstName = request.body.firstName;
        employee.lastName = request.body.lastName;
        employee.email = request.body.email;
        employee.address = request.body.address;
        employee.birthDay = request.body.birthDay;
        employee.phoneNumber = request.body.phoneNumber;
        employee.filePath = request.file.path;
        employeemodel.saveEmployee(employee);
        //console.log(employee);
        response.redirect('/employees');
    }
}