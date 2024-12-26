const createUser =
  "INSERT INTO customers (name, email, password_hash, phone, address ) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM customers WHERE email = $1";
const checkUserOrder =
  "SELECT * FROM orders WHERE order_id = $1 AND customer_id = $2 ";
const createIssue =
  "INSERT INTO issues(order_id, customer_id, issue_desc, date_created, staff_id) VALUES ($1, $2, $3, $4, $5) returning *";
const assignStaff = `
UPDATE staffs
SET issues_count = issues_count + 1
WHERE staff_id = (
    SELECT staff_id
    FROM staffs
    WHERE issues_count = (SELECT MIN(issues_count) FROM staffs where privilege = 'EMPLOYEE')
    LIMIT 1
) returning *;
`;

export default {
  createUser,
  getUserByEmail,
  checkUserOrder,
  createIssue,
  assignStaff,
};
