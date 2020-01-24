import { Badge } from "../models";

const getBadges = async(req, res) => {
    const user = req.user
    const badges = await Badge.findAll({ where: { userId: user.id } });
    res.send({ data: badges })
}

export default {
    getBadges
}
