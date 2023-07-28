import express from "express";
import { EmployeeModel } from '../models/employee.model';
import { Departments, Gender, readDataFile, writeDataFile } from '../functions/common.functions';


let employeemodel = new EmployeeModel();
const ITEMS_PER_PAGE: number = 7;
export class EmployeeController {
    constructor() {
        employeemodel = new EmployeeModel();
    }

    addNewEmployee = (request: express.Request, response: express.Response) => {
        response.render(
            "employee/add-employee",
            {
                Departments: Departments,
                Gender: Gender
            }
        )
    };

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

    getSelectedEmployee = (employeeNo: string, response: express.Response) => {


        // var selectedEmp = employeemodel.getSelectedEmployee(parseInt(employeeNo));
        // console.log(selectedEmp);
        //    response.render(
        //         "employee/edit-employee",
        //         { employee: selectedEmp }
        //     )


        employeemodel.getSelectedEmployee(parseInt(employeeNo), selectedEmp => {
            response.render(
                "employee/edit-employee",
                { selectedEmployee: selectedEmp, Departments: Departments, Gender: Gender }
            )
        });
    }
    getSelectedEmployeeForDelete = (employeeNo: string, response: express.Response) => {
        employeemodel.getSelectedEmployee(parseInt(employeeNo), selectedEmp => {
            response.render(
                "employee/delete-employee",
                { employee: selectedEmp, Departments: Departments, Gender: Gender }
            )
        });
    }

    addEmployee = (request: express.Request, response: express.Response) => {
        let file_path, file_name = "";
        if (request.file !== undefined) {
            file_path = request.file.path;
            file_name = request.file.filename;
        }
        const employee: Employee = {
            employeeNumber: request.body.empId,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            address: request.body.address,
            phoneNumber: request.body.phoneNumber,
            filePath: file_path,
            fileName: file_name,
            gender: request.body.gender,
            joiningDate: request.body.joiningDate,
            department: request.body.department
        };
        employeemodel.saveEmployee(employee);
        response.redirect('/employees');
    }

    editEmployee = (request: express.Request, response: express.Response) => {
        let file_path, file_name = "";
        if (request.file !== undefined) {
            file_path = request.file.path;
            file_name = request.file.filename;
        }
        const employee: Employee = {
            employeeNumber: parseInt(request.body.empId),
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            address: request.body.address,
            phoneNumber: request.body.phoneNumber,
            filePath: file_path,
            fileName: file_name,
            gender: request.body.gender,
            joiningDate: request.body.joiningDate,
            department: request.body.department
        };
        employeemodel.editEmployee(employee);
        response.redirect('/employees');
    }

    deleteEmployee(request: express.Request, response: express.Response): void {
        const employeeNumber = parseInt(request.params.employeeNumber);
        let employees = readDataFile();
        const initialLength = employees.length;
        employees = employees.filter((employee) => employee.employeeNumber !== employeeNumber);
        if (employees.length < initialLength) {
            writeDataFile(employees);
            response.redirect("/employees");
        } else {
            response.status(404).send("Employee not found");
        }
    }
}