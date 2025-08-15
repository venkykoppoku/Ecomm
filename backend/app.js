import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import productRoutes from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import errorMiddleware from "./middlewares/error.js";

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error ${err}`);
  console.log(`Shutting down server due to unhandled promise rejection error`);
  process.exit(1);
});
const app = express();

env.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;

//database connection
connectDatabase();

app.use(express.json());
app.use(cookieParser());

//import all routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

//custom error handler middleware
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(
    `Server listening on port ${port} in ${process.env.NODE_ENV} environment`
  );
});

// handle unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err}`);
  console.log(`Shutting down server due to unhandled promise rejection error`);
  server.close(() => {
    process.exit(1);
  });
});
