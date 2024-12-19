import { Router } from "express"

const router = Router()
const BASE_ROUTE = '/user'

router.get('/', (_, res) => {
	res.json({
		status: 'success',
		message: 'Hello World from USER'
	})
})

export default {
	BASE_ROUTE,
	router
};
