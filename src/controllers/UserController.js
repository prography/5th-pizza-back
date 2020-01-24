import { User } from '../models';

const deleteUser = async function(req, res){
    const result = await User.destroy({ where: { user_id: req.params.user_id } })
    if (result) {
        res.send({ data: result })
    }
    else {
        throw new Error('Cannot delete user')
    }
}

export default {
    deleteUser
}