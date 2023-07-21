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

    app.get("/add-employee", (req: any, res) => {
        res.render("employee/add-employee");
    });

    app.get("/employees", employeecontroller.getAllEmployees);
    app.post("/add-employee", employeecontroller.addEmployee);
    app.post("/employees", employeecontroller.deleteEmployee);
};
