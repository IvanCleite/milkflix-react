import { hashPassword } from "./loginController.js"
import { insertUserModel } from "../models/userModels.js";

export const insertUser = async (req, res) => {
    console.log('Novo usuário recebido aqui no userController: ', req.body)
    req.body.password = await hashPassword(req.body.password);
    const userId = await insertUserModel(req.body);
    res.json({ message: 'Ok' })
}