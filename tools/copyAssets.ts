import * as shell from "shelljs";
// Copy all the view templates and assets in the public folder
shell.cp("-R", ["src/views", "src/public", "src/data", "src/images"], "dist/");

// Remove unnecessary files
//shell.rm(["dist/public/js/*.ts", "dist/public/js/*.json"]);
