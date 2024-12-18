import app from './app'
import { connect } from './config';

const PORT = 3000

connect();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
