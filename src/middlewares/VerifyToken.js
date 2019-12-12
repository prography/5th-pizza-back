const models = require('../models')
const jwt = require('jsonwebtoken')

const verifyToken = async function(req, res, next ){
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).send({ error: 'token err' })
    }

    else {
        const decoded = jwt.verify(token , process.env.PASSWORD_SECRET)
        const user_id = decoded.user_id
        const user  = await models.Users.findOne({ where: { id: user_id } })
        if (user) {
            req.user = user
            next();
        }
        else {
            res.status(401).send({ error: 'Not logged in' });
        }
    }
}

module.exports = {
    verifyToken
}