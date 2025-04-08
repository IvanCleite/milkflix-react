import getConnection from "../config/db.js";

export const insertUserModel = async (userData) => {
    const conn = await getConnection();
    console.log('passou no model')
    try {
      // Extrai dinamicamente os campos do objeto
      const fields = Object.keys(userData).join(", "); // "name, email, password, phone, address, city, state, cep"
      const values = Object.values(userData);
      const placeholders = values.map(() => "?").join(", "); // "?, ?, ?, ?, ?, ?, ?, ?"
  
      const sql = `INSERT INTO users (${fields}) VALUES (${placeholders})`;
      const [result] = await conn.query(sql, values);
  
      return result.insertId; // Retorna o ID do usuário inserido
    } catch (error) {
      throw error;
    }
  };