import express from "express";
import env from "dotenv";

const app = express();

env.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
