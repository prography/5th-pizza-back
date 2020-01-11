const models = require('../models')

const getBadges = async(req, res) => {
    const user = req.user
    const badges = await models.Badges.findAll({ where: { userId: user.id } });

    res.send({ data: badges })
}

const createBadge = async(req, res) => {
    const user = req.user
    const body = req.body

    const badge = {
        type: body.type,
        level: body.level,
        userId: user.id
    }

    const result = await models.Badges.create(badge)
    res.send({data: result})
}

module.exports = {
    getBadges,
    createBadge
}