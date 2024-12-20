const createUser =
	"INSERT INTO customers (name, email, password_hash, phone, address ) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM customers WHERE email = $1";

export default {
	createUser,
	getUserByEmail,
};
