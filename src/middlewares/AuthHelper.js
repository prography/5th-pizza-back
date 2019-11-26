const models = require('../models')
const jwt = require('jsonwebtoken')
const secretObj = require("../config/key");

const verifyToken = async function(req, res, next ){
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).send( { error: 'Not logged in' } )
        next();
    }

    else {
        const decoded = jwt.verify(token , secretObj)
        const user = decoded.user_id
        const isExist = await models.Users.findOne({ where: {user_id: user} })
        if (isExist) {
            next();
        }
        else {
            res.status(401).send( { error: 'Not logged in' } );
            next();
        }
    }
}

module.exports = {
    verifyToken
}