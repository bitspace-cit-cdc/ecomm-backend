const insertStaff =
  "INSERT INTO staffs (name, email, password_hash, date_hired, privilege) VALUES($1, $2, $3, $4, $5)";
const getStaff = "select * from staffs where email = $1";
const getIssues = "select * from issues where staff_id = $1"

export default { insertStaff, getStaff, getIssues };
