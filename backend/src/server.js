import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
