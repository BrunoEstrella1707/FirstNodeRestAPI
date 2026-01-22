import bcrypt from 'bcrypt'
import express from 'express'
import { PrismaClient } from '@prisma/client'


const router = express.Router()
const prisma = new PrismaClient()


router.post('/register', async (req, res) => {
    try{
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })

        res.status(201).json({"message": "User created successfully!"})
    } catch(e) {
        res.status(400).json({"message": `Invalid request ${e.message}`})
    }
})

export default router