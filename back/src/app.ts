import express from "express";
import cors from "cors";
import { appRouter } from "./routes/routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", appRouter);

export default app;
