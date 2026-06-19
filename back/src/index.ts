import { connectToDB } from "./config/db";
import "./config/redis";
import { env } from "./config/env";
import app from "./app";

const PORT = parseInt(env.PORT) || 3001;

async function startServer() {
  await connectToDB();

  app.get("/", (req, res) => {
    res.send({ message: "Timlink backend is running!" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
  });
}

startServer();