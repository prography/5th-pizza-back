const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;
const { getAchievement } = require('../utils/AchievementCalculator')

const getChallenges = async function(req ,res){
    const user = req.user
    const challenges = await user.getBaseChallenges({ order: [[ {model: 'UserChallenges'}, 'createdAt', 'DESC']] })
    const result = { 
        data: await Promise.all(challenges.map(async (challenge) => ({ 
            ...challenge.toJSON(), 
            UserChallenges: undefined,
            achievement: await getAchievement(challenge, user),
            challengersNumber: (await challenge.getUsers()).length 
        })))
    }
    res.send(result)
}

const getChallenge = async function(req, res){
    const id = req.params.challengeId;
    const challenge = await models.BaseChallenges.findOne({ where: { id: id } });
    if (challenge) {
        res.send({ data: challenge });
    }
    else {
        throw new Error('challenge does not exist')
    }
}

const getChallengeRecords = async function(req, res){
    const challengeId = req.params.challengeId
    const user = req.user
    const records = await models.Records.findAll({ 
        where: { user_id: user.id, challenge_id: challengeId },
        order: [['created_at', 'DESC']]
    }) 
    res.send({ data: records })
}

const findOrNewBaseChallenge = async (challengeBody) => {
    const baseChallenge = await models.BaseChallenges.findOne({
        where: {
            [Op.and]: [
                { routine_type: challengeBody.routine_type },
                { object_unit: challengeBody.object_unit },
                { quota: challengeBody.quota },
                { exercise_type: challengeBody.exercise_type }
            ]
        }
    })
    if (baseChallenge) {
        return baseChallenge;
    } else {
        return models.BaseChallenges.create(challengeBody)
    }
}

const createChallenge = async function(req, res){
    const user = req.user
    const body = req.body

    // validation
    if (!body.quota) {
        res.send({ data: [{ error: 'quota value error' }] });
        return;
    }

    // baseChallenge 확인
    const baseChallenge = await findOrNewBaseChallenge(body);

    const challenge = await models.Challenges.create({
        UserId: user.id,
        BaseChallengeId: baseChallenge.id,
        start: moment(),
        end: getEndDateByBaseChallengeType(baseChallenge.routine_type),
        success: false,
    })
    res.send({
        data: [challenge],
    })
}

const deleteChallenge = async function(req, res){
    const user = req.user
    const id = req.params.challengeId
    const challenge = await models.BaseChallenges.findOne({ where: { id: id } })
    const result = await user.removeChallenge(challenge)
    if (result) {
        res.send({ data: result })
    }
    else {
        throw new Error('Cannot delete challenge')
    }
}

module.exports = {
    getChallenges,
    getChallenge,
    getChallengeRecords,
    createChallenge,
    deleteChallenge
}