import express from 'express';
import * as bodyParser from 'body-parser';
import * as routes from './routes';
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT;
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

class App {
    public app: express.Application;
    constructor() {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        // register multer. this is required to submit form data with uploaded file
        this.app.use(
            multer({ storage: fileStorage, fileFilter: null }).single('image')
        );

        // register view.
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, 'images')));
    }

    // Initialize all the routes of the application
    private initializeRoutes(): void {
        routes.registerRoute(this.app);
    }

    public listen() {
        this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}

export default App;