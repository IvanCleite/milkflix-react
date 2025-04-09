import express from "express";
import { upload } from "../config/multer.js";
import { getVideoList, insertNewVideo } from "../controllers/videoController.js";
import { insertUser, checkLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/insert-user", express.json(), (req, res) => {
  const resposta = insertUser(req, res);
});

router.post("/check-login", express.json(), (req, res) => {
  checkLogin(req, res);
});

router.get("/", async (req, res) => {
  const results = await getVideoList();
  res.json(results);
});

router.post("/insert-video", upload.fields([{ name: "video" }, { name: "image" }]), (req, res) =>
  insertNewVideo(req, res)
);

export default router;
