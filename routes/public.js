import bcrypt, { compare } from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


const router = express.Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET


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


router.post('/login', async (req, res) => {
    try {

        const user_info = req.body
        const user = await prisma.user.findUnique({
            where: {
                email: user_info.email,
            }
        })

        if (!user) {
            return res.status(404).json({message: "User not found."})
        }

        const isMatch = await bcrypt.compare(user_info.password, user.password)

        if (!isMatch){
            return res.status(404).json({message: "The password is incorrect."})
        }

        const token = jwt.sign({id: user.id},
            JWT_SECRET,
            { expiresIn: '1m'}
        )

        res.status(200).json({access: token})

    } catch (e) {
        res.status(400).json({message: `Invalid request ${e.message}`})
    }
})

export default router