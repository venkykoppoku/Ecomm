import express from "express";
import env from "dotenv";

const app = express();

//import all routes
import productRoutes from "./routes/product.js";

app.use("/api/v1", productRoutes);

env.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Server listening on port ${port} in ${process.env.NODE_ENV} environment`
  );
});
