import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'
import cookieParser from 'cookie-parser'


const app = express()


app.use(express.json())
app.use(cookieParser())


app.use('/user', publicRoutes)
app.use('/user', auth, privateRoutes)


app.listen(3000, () => console.log('Server running on port 3000 🚀...'))