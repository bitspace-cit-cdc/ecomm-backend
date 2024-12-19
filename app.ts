import express from 'express';
import { userRoutes, productRoutes, orderRoutes } from '@routes';

const app = express()

const USER = userRoutes.BASE_ROUTE;
const userRouter = userRoutes.router;

const PRODUCT = productRoutes.BASE_ROUTE;
const productRouter = productRoutes.router;

const ORDER = orderRoutes.BASE_ROUTE; 
const orderRouter = orderRoutes.router;

app.use(express.json())

app.get('/', (_, res) => {
	res.send('Hello!, I am BharathSanjeevi aka GOAT!')
})

app.use(USER, userRouter);
app.use(PRODUCT, productRouter);
app.use(ORDER, orderRouter);

export default app;
