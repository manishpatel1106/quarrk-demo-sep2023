import express, { Request, Response } from "express";
import { EmployeeController } from '../controllers/employee.controller';
import * as bodyParser from 'body-parser';

export const registerRoute = (app: express.Application) => {
    let employeecontroller = new EmployeeController();
    // home page    
    app.get("/", (req: any, res) => {
        res.render("index");
    });

    // about page    
    app.get("/login", (req: any, res) => {
        res.render("auth/login");
    });
    // about page    
    app.get("/signup", (req: any, res) => {
        res.render("auth/signup");
    });
    // app.get("/employees", (req: any, res) => {
    //     res.render("employee/employees");
    // });
    app.get("/view-employee", (req: any, res) => {
        res.render("employee/view-employee");
    });

    app.get("/add-employee", employeecontroller.addNewEmployee);

    app.get("/edit-employee", employeecontroller.getSelectedEmployee);


    app.get("/employees", employeecontroller.getAllEmployees);

    app.post("/edit-employee", employeecontroller.editEmployee);
    app.post("/add-employee", employeecontroller.addEmployee);

    app.get("/employees", employeecontroller.getAllEmployees);
    app.post("/add-employee", employeecontroller.addEmployee);
    app.post("/employees", employeecontroller.deleteEmployee);

    app.get("/delete-employee", employeecontroller.getSelectedEmployeeForDelete);
    app.post('/delete/:employeeNumber',employeecontroller.deleteEmployee);
};