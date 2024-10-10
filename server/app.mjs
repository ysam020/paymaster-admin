import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cluster from "cluster";
import os from "os";
import bodyParser from "body-parser";
dotenv.config();

import login from "./routes/login.mjs";
import getData from "./routes/getData.mjs";
import updateBanner from "./routes/updateBanner.mjs";
import updateAboutUs from "./routes/updateAboutUs.mjs";
import updateFeatures from "./routes/updateFeatures.mjs";
import updateReviews from "./routes/updateReviews.mjs";
import updatePartners from "./routes/updatePartners.mjs";
import updateProducts from "./routes/updateProducts.mjs";

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_MONGODB_URI
    : process.env.NODE_ENV === "server"
    ? process.env.SERVER_MONGODB_URI
    : process.env.DEV_MONGODB_URI;

const numOfCPU = os.availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < numOfCPU; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Starting a new worker`);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(compression({ level: 9 }));

  mongoose.set("strictQuery", true);

  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize: 10,
      maxPoolSize: 1000,
    })
    .then(async () => {
      app.get("/", async (req, res) => {
        try {
          res.send("welcome");
        } catch (error) {
          res.status(500).send("An error occurred while updating the jobs");
        }
      });

      app.use(login);
      app.use(getData);
      app.use(updateBanner);
      app.use(updateAboutUs);
      app.use(updateFeatures);
      app.use(updateReviews);
      app.use(updatePartners);
      app.use(updateProducts);

      app.listen(9000, () => {
        console.log(`BE started at port 9000`);
      });
    })
    .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });
}
