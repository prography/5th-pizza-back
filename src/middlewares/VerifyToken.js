import models from '../models';
import jwt from 'jsonwebtoken';

const verifyToken = async function(req, res, next){
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).send({ error: 'server token err' })
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

export default {
    verifyToken
}