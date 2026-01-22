import express from 'express'
import publicRoutes from './routes/public.js'


const app = express()
app.use(express.json())


app.use('/user', publicRoutes)


app.listen(3000, () => console.log('Server running on port 3000 🚀...'))