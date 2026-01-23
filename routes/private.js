import express from 'express'
import { PrismaClient } from '@prisma/client'


const router = express.Router()
const prisma = new PrismaClient()


router.get('/list', async (req, res) => {
    try {
        console.log(req)

        const users = await prisma.user.findMany({
            omit: { password: true }
        })

        return res.status(200).json(users)

    } catch (e) {
        return res.status(400).json({message: `Error ${e}`})
    }
})


router.get('/detail/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            },
            omit: {password: true}
        })

        return res.status(200).json(user)

    } catch (e) {
        return res.status(400).json({message: `Error ${e}`})
    }
})

export default router