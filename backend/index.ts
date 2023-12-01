//@ts-nocheck
import express from "express";
import cors from "cors";
import { router } from "./src/router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
