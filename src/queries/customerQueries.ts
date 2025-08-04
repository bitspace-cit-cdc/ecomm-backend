const getAllCustomers = "SELECT * FROM CUSTOMERS";
const getCustomer = "SELECT * FROM CUSTOMERS WHERE CUSTOMER_ID = $1";

export default {
  getAllCustomers,
  getCustomer,
};
