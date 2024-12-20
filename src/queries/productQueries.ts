const getAllProducts = "SELECT * FROM products";
const getProductsByCategory = "SELECT * FROM products WHERE product_type = $1";
const addProduct =
	"INSERT INTO products(product_type, name, price, quantity, image_url) VALUES($1, $2, $3 , $4, $5)";
const updateProduct = (fields: string[]) => {
	const setClause = fields
		.map((field, index) => `${field} = $${index + 1}`)
		.join(", ");
	return `UPDATE products SET ${setClause} WHERE product_id = $${fields.length + 1}`;
};

export default {
	getAllProducts,
	getProductsByCategory,
	updateProduct,
	addProduct,
};
