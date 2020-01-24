import { User } from '../models'
import jwt from 'jsonwebtoken'
import { getUserInfo, setUserPayload } from '../utils/GetUserInfo'

const login = async function(req, res){
    const access_token = req.headers['x-social-token']
    const type = req.params.type
    if (access_token) {
        let user
        const userInfo = await getUserInfo(type, access_token)
        if (type === 'google'){
            user = await User.findOne({ where: { email: userInfo.email, type: type }})
        }
        else {
            user = await User.findOne({ where: { userId: userInfo.id, type: type }})
        }

        if (!user) {
            const userPayload = await setUserPayload(type, userInfo)
            user = await User.create(userPayload)
            if (!user) { throw new Error('Cannot create user') }
        }
        const token = jwt.sign({ user_id: user.id }, process.env.PASSWORD_SECRET , { expiresIn: '7d' })
        res.send({ data: user, access_token: token })
    }
    else {
        throw new Error('social token error')
    }
}

export default {
    login
}