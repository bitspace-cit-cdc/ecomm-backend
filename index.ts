import app from './app'
import { db } from '@config';
const PORT = 3000

db.connect();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
