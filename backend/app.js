import express from "express";
import env from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import productRoutes from "./routes/product.js";

const app = express();

env.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;

//database connection
connectDatabase();

app.use(express.json());

//import all routes
app.use("/api/v1", productRoutes);

app.listen(port, () => {
  console.log(
    `Server listening on port ${port} in ${process.env.NODE_ENV} environment`
  );
});
