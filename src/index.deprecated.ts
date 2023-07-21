import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from './routes';
import * as bodyParser from 'body-parser';
import multer from "multer";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register multer. this is required to submit form data with uploaded file
app.use(
    multer({ storage: fileStorage, fileFilter: null }).single('image')
);

// register view.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'images')));

// Configure routes
routes.registerRoute(app);
// start the express server

app.listen(port, () => {
    // tslint:disable-next-line:no-console    
    console.log(`server started at http://localhost:${port}`);
});