import knex, { type Knex } from "knex";

let cachedConnection: Knex;

export const getDatabaseConnector = () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const config = {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  };
  const connection = knex(config);
  cachedConnection = connection;
  return connection;
};
