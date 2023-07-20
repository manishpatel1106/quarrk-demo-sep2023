import express from "express";
import { EmployeeModel } from '../models/employee.model';

let employeemodel = new EmployeeModel();
const ITEMS_PER_PAGE: number = 10;
export class EmployeeController {
    constructor() {
        employeemodel = new EmployeeModel();
    }

    getAllEmployees = (request: express.Request, response: express.Response) => {
        var page: number = 1;
        if (request.query.page !== undefined) {
            page = parseInt(request.query.page.toString());
        }
        employeemodel.getAllEmployees(employees => {
            let totalEmployees = employees.length;
            var skip = (page - 1) * ITEMS_PER_PAGE;
            var limit = ((page - 1) * ITEMS_PER_PAGE) + ITEMS_PER_PAGE;

            const pagination: IPagination = {
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalEmployees,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalEmployees / ITEMS_PER_PAGE),
                totalEmployees: employees.length
            };
            response.render(
                
                "employee/employees",
                {
                    employees: employees.slice(skip, limit),
                    pagination: pagination
                }
            )
        })
    }

    addEmployee = (request: express.Request, response: express.Response) => {
        const employee: Employee = {
            employeeNumber: request.body.empId,
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
    deleteEmployee = (employeeNumber: number): boolean => {
        let employees = employeemodel.readDataFile();
        const initialLength = employees.length;
        employees = employees.filter((employee) => employee.employeeNumber !== employeeNumber);
        if (employees.length < initialLength) {
            employeemodel.writeDataFile(employees);
          return true;
        } else {
          return false;
        }
      };
}