import { Request, Response } from "express";
import { db } from "@config";
import { orderQueries } from "@queries";

const getOrders = async (req: Request, _res: Response) => {
  const customer_id = req.body.customer_id;
  const client = await db.pool.connect();
  const result = await client.query(orderQueries.getOrders, [customer_id]);
  client.release();
  return result.rows;
};

const getOrderDetails = async (req: Request, _res: Response) => {
  const order_id = req.body.order_id;
  const client = await db.pool.connect();
  const result = await client.query(orderQueries.getOrderDetails, [order_id]);
  client.release();
  return result.rows;
};

const addOrder = async (req: Request, _res: Response) => {
  const client = await db.pool.connect();

  try {
    await client.query("BEGIN");

    const { payment, products, ...orderFields } = req.body;
    const authUserId = req.body.token.id;

    // Insert order
    const orderValues = [
      authUserId,
      orderFields.order_date,
      parseInt(orderFields.total_amount),
      orderFields.shipping_address,
    ];
    const orderResult = await client.query(orderQueries.addOrder, orderValues);
    const order_id = orderResult.rows[0].order_id;

    // Insert order details
    const productValues: string[] = [];
    products.forEach((product: any) => {
      productValues.push(product.product_id, product.quantity, product.price);
    });
    const orderDetailsQuery = orderQueries.addOrderDetails(products);
    await client.query(orderDetailsQuery, [order_id, ...productValues]);

    // Insert payment details
    const paymentValues = [order_id, payment.payment_method, payment.amount];
    await client.query(orderQueries.addPaymentDetails, paymentValues);

    await client.query("COMMIT");

    return order_id;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw new Error();
  } finally {
    client.release();
  }
};

const updatePaymentStatus = async (req: Request, _res: Response) => {
  const client = await db.pool.connect();
  const values = Object.values(req.body);
  await client.query(orderQueries.updatePaymentStatus, values);
  client.release();
};

const updateDeliveryStatus = async (req: Request, _res: Response) => {
  const client = await db.pool.connect();
  const values = Object.values(req.body);
  await client.query(orderQueries.updateDeliveryStatus, values);
  client.release();
};

export default {
  getOrders,
  getOrderDetails,
  addOrder,
  updatePaymentStatus,
  updateDeliveryStatus,
};
