import express from 'express';
import {
	BASE_ROUTE as USER, 
	router as userRouter
} from '@routes/userRoutes';

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
	res.send('Hello!, I am BharathSanjeevi aka GOAT!')
})

app.use(USER, userRouter)

export default app;
