const express = require("express");
const cors = require("cors");
const config = require("./configs/config");
const userRouter = require("./routes/user");
const docRouter = require("./routes/docter");
const appointmentRouter = require("./routes/appointment");
require("./db/mongoose");
class AppointmentBookingSystem {
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
    this.app.use("/v1", userRouter);
    this.app.use("/v1", docRouter);
    this.app.use("/v1", appointmentRouter);
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

new AppointmentBookingSystem(parseInt(config.SERVICE_PORT)).StartApp();
