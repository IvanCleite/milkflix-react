import getConnection from "../config/db.js";



export const findUserByEmail = async (email) => {
  console.log('email no model: ', email)
  const conn = await getConnection();
  try {
    const [rows] = await conn.query('SELECT id, email FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

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
  console.log('email no model: ', email)
  const conn = await getConnection();
  try {
    const result = await conn.query(`SELECT password, role FROM users WHERE email = '${email}' `);
    console.log('result no model: ', result)
    return result;
  } catch (error) {
    throw error;
  }
};
