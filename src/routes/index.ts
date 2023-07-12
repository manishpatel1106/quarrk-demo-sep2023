import * as express from "express";
import { EmployeeController } from '../controllers/EmployeeController';
import * as bodyParser from 'body-parser';

export const registerRoute = (app: express.Application) => {
    let employeecontroller = new EmployeeController();
    // home page    
    app.get("/", (req: any, res) => {
        res.render("index");
    });

    // about page    
    app.get("/about", (req: any, res) => {
        res.render("about");
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
    app.get("/add-employee", (req: any, res) => {
        res.render("employee/add-employee");
    });

    // app.get("/edit-employee", (req: any, res) => {
    //     res.render("employee/edit-employee");
    // });

    app.get("/employees", employeecontroller.getAllEmployees);
    app.post("/add-employee", bodyParser.urlencoded({ extended: true }), employeecontroller.addEmployee);

};
