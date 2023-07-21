import express from "express";
import { EmployeeModel } from '../models/employee.model';

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
            )
        });
    }

    getSelectedEmployee = (employeeNo: string, response: express.Response) => {


        // var selectedEmp = employeemodel.getSelectedEmployee(parseInt(employeeNo));
        // console.log(selectedEmp);
        //    response.render(
        //         "employee/edit-employee",
        //         { employee: selectedEmp }
        //     )

        employeemodel.getSelectedEmployee(parseInt(employeeNo) , selectedEmp => {
            console.log(selectedEmp);
            response.render(
                "employee/edit-employee",
                { selectedEmployee: selectedEmp }
            )
        });
    }


    addEmployee = (request: express.Request, response: express.Response) => {
        const employee: Employee = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            address: request.body.address,
            birthDay: request.body.birthDay,
            phoneNumber: request.body.phoneNumber,
            filePath: request.file.path,
            fileName: request.file.filename
        };
        employeemodel.saveEmployee(employee);
        response.redirect('/employees');
    }

    editEmployee = (request: express.Request, response: express.Response) => {
        const employee: Employee = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            address: request.body.address,
            birthDay: request.body.birthDay,
            phoneNumber: request.body.phoneNumber,
            filePath: request.file.path,
            fileName: request.file.filename
        };
        employeemodel.editEmployee(employee);
        response.redirect('/employees');
    }
}