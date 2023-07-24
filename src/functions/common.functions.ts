import path from "path";
import fs from "fs";

export const dataFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'employees.json');

export const Departments: string[] = ["Accounts", "Admin", "HR", "IT"];
export const Gender: string[] = ["Male", "Female"];

export let readDataFile = function (): Employee[] {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Function to write employees data to the JSON file
export let writeDataFile = function (employees: Employee[]): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), "utf-8");
};