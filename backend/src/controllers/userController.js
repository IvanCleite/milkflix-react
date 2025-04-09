import { hashPassword, checkPassword } from "./loginController.js";
import { insertUserModel, checkLoginModel } from "../models/userModels.js";

export const insertUser = async (req, res) => {
  req.body.password = await hashPassword(req.body.password);

  try {
    const [result] = await insertUserModel(req.body);
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const checkLogin = async (req, res) => {
  const [result] = await checkLoginModel(req.body.email);

  if (result.length === 0) {
    return res.status(401).json({
      success: false,
      message: "E-mail não encontrado",
    });
  } else {
    const storedPassword = result[0].password;
    const passwordOk = await checkPassword(req.body.passwordLogin, storedPassword);

    if (passwordOk) {
      return res.json({
        success: true,
        role: result[0].role,
        message: "Login realizado com sucesso",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Senha inválida",
      });
    }
  }
};
