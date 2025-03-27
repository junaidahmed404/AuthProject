import jwt from "jsonwebtoken"

export const varifyToken = (req, res, next) => {

    const token = req.cookies.token

    if (!token) return res.status(401).json({ success: false, message: "Unathorized - no token Provided" })

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {

            return res.status(401).json({ success: false, message: "Unathorized - Invalid token" })

        }

        req.userId = decoded.userId

        next()

    } catch (error) {

        return res.status(500).json({ success: false, message: "Invalid token" })
        
    }

}