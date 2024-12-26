import express from "express";
import cors from "cors";
import {
  userRoutes,
  productRoutes,
  orderRoutes,
  automateRoutes,
  staffRoutes,
} from "@routes";
import { logHandler } from "@/middlewares";

const app = express();
const BASE_ROUTE = "/api/v1";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logHandler);

app.use(`${BASE_ROUTE}${orderRoutes.BASE_ROUTE}`, orderRoutes.router);
app.use(`${BASE_ROUTE}${productRoutes.BASE_ROUTE}`, productRoutes.router);
app.use(`${BASE_ROUTE}${userRoutes.BASE_ROUTE}`, userRoutes.router);
app.use(`${BASE_ROUTE}${automateRoutes.BASE_ROUTE}`, automateRoutes.router);
app.use(`${BASE_ROUTE}${staffRoutes.BASE_ROUTE}`, staffRoutes.router);

export default app;
