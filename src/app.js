import { default as express } from "express";
import { default as cors } from "cors";
import { config } from "./configs/config.js";
import * as connect from "./db/mongoose.js";
class ChatServiceApp {
  port;
  app;

  constructor(port) {
    this.port = port;

    this.app = express();

    // Initialization of middlewares.
    this.initializeSystemMiddlewares();

    // Initialization of routes.
    this.initializeRoutes();
  }

  initializeSystemMiddlewares() {
    this.app.use(
      cors({
        origin: config.API_HOSTS,
        methods: "GET,POST,PUT,DELETE,PATCH",
      })
    );

    this.app.use(
      express.urlencoded({
        extended: true,
        limit: "100KB",
      })
    );
    this.app.use(express.json());
  }

  initializeRoutes() {
    this.app.use("/", (req, res, next) => {
      res
        .status(200)
        .send("Docter's Appointment Booking System is up and running!");
      next();
    });
  }

  StartApp() {
    this.app.listen(this.port, () => {
      console.log(
        `${config.APP_NAME} Server: Express server is listening on port ${this.port}!`
      );
    });
  }
}

new ChatServiceApp(parseInt(config.SERVICE_PORT)).StartApp();
