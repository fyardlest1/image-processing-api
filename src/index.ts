import express from 'express';
import routes from './routes/index'

const app = express();
const PORT = process.env.PORT || 5000
import 'dotenv/config'

const api = process.env.API_URL

app.use(express.json())

app.use(`${api}`, routes)

app.listen(PORT, () => {
    console.log(`server started at http//localhost:${PORT}`)
})