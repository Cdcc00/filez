import { getFiles } from "#db/queries/files";
import express from "express";
import router from "#api/folders";
const app = express();
export default app;

app.use(express.json());

app.get("/files", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});

app.use("/folders", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
