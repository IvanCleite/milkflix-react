import express from 'express';
import { upload } from '../config/multer.js';
import {
  getVideoList,
  insertNewVideo,
} from '../controllers/video-controller.js';
import {
  insertUser,
  checkLogin,
  forgotPassword,
} from '../controllers/user-controller.js';

const router = express.Router();

router.post('/insert-user', express.json(), (req, res) => {
  const resposta = insertUser(req, res);
});

router.post('/check-login', express.json(), (req, res) => {
  console.log('req.body no router: ', req.body);
  checkLogin(req, res);
});



router.post('/forgot-password', forgotPassword);



router.get('/', async (req, res) => {
  const results = await getVideoList();
  res.json(results);
});

router.post(
  '/insert-video',
  upload.fields([{ name: 'video' }, { name: 'image' }]),
  (req, res) => insertNewVideo(req, res)
);

export default router;
