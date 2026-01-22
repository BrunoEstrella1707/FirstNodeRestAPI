import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET


const auth = (req, res, next) => {

    try {

        const token = req.headers.authorization
        if (!token){
            return res.status(401).json({message: "No token was provided."})
        }
        console.log(token)
        console.log(token.replace('Bearer ', ''))

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        console.log(decoded)

        next()

    } catch (e) {
        return res.status(401).json({message: "Unauthorized access."})
    }
    
}


export default auth