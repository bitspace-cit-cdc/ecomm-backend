import  { Request, Response } from "express";
import { db } from "@config";
import  { orderQueries } from "@queries";

const getOrders = async(req: Request, res: Response) => {
	try {
	  const customer_id = req.body.customer_id;
	  const client = await db.pool.connect();
	  const result = await client.query(orderQueries.getOrders, [customer_id] );
	  res.status(200).json({
	     message : "Successfully fetched",
	     records : result.rows
	  });
	} catch(err) {
	  console.error(err);
	  res.status(500).json({
	     message : "Error occured while fetching",
	  });
	}
};	

const getOrderDetails = async(req: Request, res: Response) => {
	try {
	  const order_id = req.body.order_id;
	  const client = await db.pool.connect();
	  const result = await client.query(orderQueries.getOrderDetails, [order_id] );
	  res.status(200).json({
	     message : "Successfully fetched",
	     records : result.rows
	  });
	} catch(err) {
	  console.error(err);
	  res.status(500).json({
	     message : "Error occured while fetching",
	  });
	}
};	

const addOrder = async (req: Request, res: Response) => {
  const client = await db.pool.connect();

  try {
    await client.query("BEGIN");

    const { payment, products, ...orderFields } = req.body;

    // Insert order
    const orderValues = [
      orderFields.customer_id,
      orderFields.order_date,
      orderFields.total_amount,
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
    const paymentValues = [
      order_id,
      payment.payment_method,
      payment.amount,
    ];
    await client.query(orderQueries.addPaymentDetails, paymentValues);

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      order_id,
    });
  } catch (err) {
    await client.query("ROLLBACK"); 
    console.error(err);
    res.status(500).json({
      message: "Error occurred while placing the order",
    });
  } finally {
    client.release();
  }
};


const updatePaymentStatus = async(req: Request, res: Response) => {
	try {
	  const client = await db.pool.connect();
	  const values = Object.values(req.body);
	  const result = await client.query(orderQueries.updatePaymentStatus, values);
	  client.release();
	  res.status(200).json({
		  message: `Successfully updated`
	  });
	} catch(err) {
	  console.error(err);
	  res.status(500).json({
	     message : "Error occured while updating"
	  });
	};
};



const updateDeliveryStatus = async(req: Request, res: Response) => {
	try {
	  const client = await db.pool.connect();
	  const values = Object.values(req.body);
	  const result = await client.query(orderQueries.updateDeliveryStatus, values);
	  client.release();
	  res.status(200).json({
		  message: `Successfully updated`
	  });
	} catch(err) {
	  console.error(err);
	  res.status(500).json({
	     message : "Error occured while updating"
	  });
	};
};

export default {
       getOrders,
       getOrderDetails,
       addOrder,
       updatePaymentStatus,
       updateDeliveryStatus
};
