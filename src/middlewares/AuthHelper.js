const models = require('../models')
const jwt = require('jsonwebtoken')

const verifyToken = async function(req, res, next ){
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).send( { error: 'Not logged in' } )
    }

    else {
        const decoded = jwt.verify(token , process.env.PASSWORD_SECRET)
        const user = decoded.user_id
        const isExist = await models.Users.findOne({ where: {user_id: user} })
        if (isExist) {
            req.user(user)
            next();
        }
        else {
            res.status(401).send( { error: 'Not logged in' } );
        }
    }
}

module.exports = {
    verifyToken
}