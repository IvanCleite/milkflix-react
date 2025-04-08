import mysql from 'mysql2/promise'

const dbConfig = {
    host: 'localhost',
    user: 'ivan',
    password: '123',
    database: 'milkflix',
}

async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão estabelecida com sucesso!');
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
}

export default getConnection