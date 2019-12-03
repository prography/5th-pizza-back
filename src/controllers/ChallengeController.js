const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;


const getChallenges = async function(req ,res){
    const challenges = await models.Challenges.findAll();
    res.send( {data: challenges} );
}

const getChallenge = async function(req, res){
    const id = req.params.challenge;
    const challenge = await models.Challenges.findOne({where: {id: id}});
    if (challenge) {
        res.send({ data: challenge });
    }
    else {
        throw new Error('challenge does not exist')
    }
}

const createChallenge = async function(req, res){
    const body = req.body
    const challenge = {
        routine_type: body.routine_type,
        object_unit: body.object_unit,
        quota: body.quota,
        exercise_type: body.exercise_type,
        created_at: moment()
    }

    const result = await models.Challenges.create(challenge)
    if (result) res.send({ data: result })
    else throw new Error('Cannot create challenge')
}

const deleteChallenge = async function(req, res){
    const id = req.params.challenge
    const result = await models.Challenges.destroy({ where: {id: id} })
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
    createChallenge,
    deleteChallenge
}