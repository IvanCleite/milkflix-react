import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { insertVideo, videoList } from "../models/videoModels.js";

// Configuração do __dirname no ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('&&&&&&&&&&&&&&&&&&&', __dirname)

export const getVideoList = async () => {
  const results = await videoList();
  return results;
};

export const insertNewVideo = async (req, res) => {
  try {
    console.log("Arquivos recebidos:", req.files);
    console.log("Dados do formulário:", req.body);

    if (!req.files || !req.files.video || !req.files.image) {
      return res.status(400).json({ error: "Arquivo(s) não enviado(s)!" });
    }

    // const { title, modality, origin, instructions } = req.body;
    // const videoFilename = req.files.video[0].filename;
    // const imageFilename = req.files.image[0].filename;

    const newId = await insertVideo(req.body);

    // Define os nomes dos arquivos
    const videoFilename = `${newId}-video.mp4`;
    const imageFilename = `${newId}-image.png`;

    // Caminhos para salvar os arquivos
    const videoPath = path.join(
      __dirname,
      "../../../frontend/public/assets/videos",
      videoFilename
    );
    const imagePath = path.join(
      __dirname,
      "../../../frontend/public/assets/images",
      imageFilename
    );

    // Salvar os arquivos manualmente no disco
    fs.writeFileSync(videoPath, req.files.video[0].buffer);
    fs.writeFileSync(imagePath, req.files.image[0].buffer);

    console.log("((((((((((((controller: ", newId);

    res.json({ mensagem: "Upload realizado com sucesso!", id: newId });
  } catch (error) {
    console.error("Erro no upload:", error);
    res.status(500).json({ error: "Erro ao salvar os arquivos." });
  }
};
