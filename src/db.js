const { Pool } = require('pg');
const baseLogger = require('./logger');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'ordersdb',
  port: process.env.DB_PORT || 5432,
});

const connectDb = async () => {
  baseLogger.info("connecting...");
  try {
    await pool.query('SELECT NOW()');
    baseLogger.info("connected");
  } catch (err) {
    baseLogger.error("error", { err: err.message });
    baseLogger.warn("retry");
  }
};

const queryDb = async (logger, text, params) => {
  logger.info("query...", { query: text });
  const res = await pool.query(text, params);
  logger.info("finished");
  return res;
};

module.exports = { connectDb, queryDb, pool };
