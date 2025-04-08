import multer from "multer";
// import { memoryStorage } from "multer";
// import path from "path";

// Configuração do armazenamento dos arquivos
// const storage = multer.diskStorage({
//   destination: "./uploads/", // Pasta onde os arquivos serão salvos
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueSuffix);
//   },

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});
