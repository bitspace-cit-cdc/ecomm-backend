import { Request, Response } from "express";
import { productQueries } from "@queries";
import { db } from "@config";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await db.pool.connect();
    const result = await client.query(productQueries.getAllProducts);
    client.release();
    res.status(200).json({
      message: "Fetched all products successfully",
      records: result.rows,
    });
  } catch (err) {
    console.error("Error fetching all products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await db.pool.connect();
    const category = req.body.category;
    const result = await client.query(productQueries.getProductsByCategory, [category]); 
    client.release();
    res.status(200).json({
      message: "Fetched products by category successfully",
      records: result.rows,
    });
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await db.pool.connect();
    const values = Object.values(req.body);
    const result = await client.query(productQueries.addProduct, values);
    client.release();
    res.status(201).json({
      message: "Product added successfully",
    })
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, ...fieldsToUpdate } = req.body;

    if (!product_id) {
      res.status(400).json({ error: "Product ID is required for updates" });
      return;
    }

    const fields = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);
    values.push(product_id);

    const query = productQueries.updateProduct(fields); 

    const client = await db.pool.connect();
    const result = await client.query(query, values);
    client.release();

    res.status(200).json({
      message: "Product updated successfully",
      affectedRows: result.rowCount,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export default {
  getAllProducts,
  getProductsByCategory,
  addProduct,
  updateProduct
};

