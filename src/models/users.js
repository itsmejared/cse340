import db from "./db.js";
import bcrypt from "bcrypt";

const createUser = async (name, email, passwordHash) => {
  const DEFAULT_ROLE = "user";
  const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
  const queryParams = [name, email, passwordHash, DEFAULT_ROLE];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create user");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    logger.info(`Created new user with ID: ${result.rows[0].user_id}`);
  }

  return result.rows[0].user_id;
};

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return null;
  }

  delete user.password_hash;
  return user;
};

const findUserByEmail = async (email) => {
  const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
  const queryParams = [email];

  const result = await db.query(query, queryParams);

  return result.rows[0] ?? null;
};

const verifyPassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);

const getAllUsers = async () => {
  const query = `
    SELECT
      u.user_id,
      u.name,
      u.email,
      r.role_name
    FROM users u
    JOIN roles r
      ON u.role_id = r.role_id
    ORDER BY u.name;
  `;

  const result = await db.query(query);
  return result.rows;
};

export { createUser, authenticateUser, getAllUsers };
