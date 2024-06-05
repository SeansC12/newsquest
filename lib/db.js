// import mysql from "mysql2/promise";
import { createClient } from "@libsql/client";

let turso = createClient({
  url: "file:users.db",
  // url: process.env.TURBO_DATABASE_URL,
  // authToken: process.env.TURSO_AUTH_TOKEN,
});

// let dbConnection;

// (async () => {
//   dbConnection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     waitForConnections: true,
//     connectionLimit: 10, // change maximum number of connections here
//     queueLimit: 0,
//   });
// })();

const getJSON = (data) => {
  const { columns, rows } = data;

  if (!rows || !columns) return null;

  let result = [];

  for (let i = 0; i < rows.length; i++) {
    const object = {};
    for (let j = 0; j < columns.length; j++) {
      object[columns[j]] = rows[i][j];
    }
    result.push(object);
  }

  if (result.length === 0) {
    return null;
  }

  return result;
};

export async function query({ query, values = [] }) {
  // try {
  //   const [results] = await dbConnection.execute(
  //     query,
  //     values
  //   );
  //   return results;
  // } catch (error) {
  //   throw Error(error.message);
  // }

  try {
    const rawResults = await turso.execute({
      sql: query,
      args: values,
    });
    const results = getJSON(rawResults);
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}
