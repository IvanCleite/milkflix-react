import express from "express";
import { upload } from "../config/multer.js";
import {
  getVideoList,
  insertNewVideo,
} from "../controllers/videoController.js";
import { insertUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/insert-user', express.json(), (req, res) => {
  console.log('***** Dados do usuário recebidos aqui no router: ', req.body)
  const resposta = insertUser(req, res)
  // console.log('=====>>>>', resposta)
  // res.json(resposta)
})

router.get("/", async (req, res) => {
  const results = await getVideoList();
  res.json(results);
  // res.json({ message: "API GetList funcionando só bactante!", results });
});

router.post(
  "/insert-video",
  upload.fields([{ name: "video" }, { name: "image" }]),
  (req, res) => insertNewVideo(req, res)
);

export default router;
