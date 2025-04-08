import { json } from "express";
import getConnection from "../config/db.js";

export const videoList = async () => {
  let conn
  try {
    conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM videos");
    return result;
  } catch (error) {
    console.error("Algo deu errado: ", error.message);
    return []
  } finally {
    if (conn) {
      await conn.end()
    }
  }
};

export const insertVideo = async (newVideo)=>{
  console.log('************** ', newVideo)
  try {

    const conn = await getConnection();
    const [result] = await conn.query(
      "INSERT INTO videos (title, modality, origin, instructions) VALUES (?, ?, ?, ?)",
      [newVideo.title, newVideo.modality, newVideo.origin, newVideo.instructions]
    );

    console.log('models==========', result.insertId )

    return result.insertId;
    // res.json({ mensagem: "Vídeo inserido com sucesso!", id: result.insertId });
  } catch (error) {
    console.error("Erro no BD:", error);
    res.status(500).json({ error: "Erro ao inserir dados no BD." });
  }
}