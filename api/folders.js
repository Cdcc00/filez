import { createFile } from "#db/queries/files";
import { getFolderByIdIncludingFiles, getFolders } from "#db/queries/folders";
import express from "express";
//create express router
const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder) return res.status(404).send("Folder not found");
    res.send(folder);
  })
  .post("/:id/files", async (req, res) => {
    const id = req.params.id;
    const folder = await getFolderByIdIncludingFiles(id);
    if (!folder) return res.status(404).send("Folder not found");

    if (!req.body) return res.status(400).send("Body is not provided");

    const { name, size } = req.body;

    if (!name || !size)
      return res.status(400).send("Body is missing required fields");

    const file = await createFile({ name, size, folder_id: folder.id });

    res.status(201).send(file);
  });
