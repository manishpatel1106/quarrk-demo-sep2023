import * as express from "express";
export const register = (app: express.Application) => {
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
};
