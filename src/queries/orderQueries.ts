const getOrders = "SELECT * from orders WHERE customer_id = $1";
const addOrder = "INSERT INTO orders(customer_id, order_date, total_amount, shipping_address) VALUES($1, $2, $3, $4) RETURNING order_id";

const getOrderDetails = "SELECT * from order_items WHERE order_id = $1";
const addOrderDetails = (values:any) => {
	let count = 1;
        const setClause = values.map((val:any, ind:number) => `($1, $${++count}, $${++count}, $${++count})`).join(", ");
	return `INSERT INTO order_items(order_id, product_id, quantity, price) VALUES ${setClause}`;
};

const addPaymentDetails = `INSERT INTO payments(order_id, payment_method, amount) VALUES($1, $2, $3)`;
const updatePaymentStatus = `UPDATE payments SET payment_status = $2 WHERE order_id = $1`;
const updateDeliveryStatus = `UPDATE orders SET delivery_status = $2 WHERE order_id = $1`;

export default {
	getOrders,
	addOrder,
	getOrderDetails,
	addOrderDetails,
	addPaymentDetails,
	updatePaymentStatus,
	updateDeliveryStatus
};
