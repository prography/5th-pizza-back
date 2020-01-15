const models = require('../models')

const getBadges = async(req, res) => {
    const user = req.user
    const badges = await models.Badges.findAll({ where: { userId: user.id } });

    res.send({ data: badges })
}

module.exports = {
    getBadges,
    createBadge
}