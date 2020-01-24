import { Badge } from "../models";

const getBadges = async(req, res) => {
    const user = req.user
    const badges = await Badge.findAll({ where: { userId: user.id } });
    res.send({ 
        data: transformBadges(badges)
    })
}

const transformBadge = (badge) => ({
    id: badge.id,
    user_id: badge.userId,
    type: badge.type,
    level: badge.level
})

const transformBadges = (badges) => badges.map(transformBadge);

export default {
    getBadges
}
