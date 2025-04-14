import { hashPassword, checkPassword } from '../utils/password-utils.js';
import { sendRecoveryEmail } from '../services/sendRecoveryEmail.js';
import {
  insertUserModel,
  checkLoginModel,
  findUserByEmail,
} from '../models/user-model.js';

export const forgotPassword = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ message: 'E-mail não encontrado' });
    }

    await sendRecoveryEmail(req.body.email);

    return res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro no forgotPassword:', error);
    return res
      .status(500)
      .json({ message: 'Erro interno ao tentar enviar e-mail' });
  }
};

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
  console.log('req.bady no userController: ', req.body.email);

  if (result.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'E-mail não encontrado',
    });
  } else {
    const storedPassword = result[0].password;
    const passwordOk = await checkPassword(req.body.password, storedPassword);

    if (passwordOk) {
      return res.json({
        success: true,
        role: result[0].role,
        message: 'Login realizado com sucesso',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Senha inválida',
      });
    }
  }
};
