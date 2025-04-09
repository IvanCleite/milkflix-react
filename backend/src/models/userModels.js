import getConnection from "../config/db.js";

export const insertUserModel = async (userData) => {
  const conn = await getConnection();
  try {
    // Extrai dinamicamente os campos do objeto
    const fields = Object.keys(userData).join(", ");
    const values = Object.values(userData);
    const placeholders = values.map(() => "?").join(", ");

    const sql = `INSERT INTO users (${fields}) VALUES (${placeholders})`;
    const result = await conn.query(sql, values);

    return result;
  } catch (error) {
    throw new error("(MODELS)Erro ao adicionar o usuário: " + error.message);
  }
};

export const checkLoginModel = async (email) => {
  const conn = await getConnection();
  try {
    const result = await conn.query(`SELECT password, role FROM users WHERE email = '${email}' `);
    return result;
  } catch (error) {
    throw error;
  }
};
