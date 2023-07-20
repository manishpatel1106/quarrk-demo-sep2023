import path from "path";
import fs from "fs";


const dataFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'employees.json');

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
    
    readDataFile = (): Employee[] => {
        try {
          const data = fs.readFileSync(dataFilePath, "utf-8");
          return JSON.parse(data);
        } catch (error) {
          return [];
        }
      };
      // Function to write employees data to the JSON file
    writeDataFile = (employees: Employee[]): void => {
    fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2), "utf-8");
  };
}