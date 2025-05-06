const jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {
    const token  = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = token_decode.user
        next()
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }


}

module.exports = fetchuser