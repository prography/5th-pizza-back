const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const getChallenges =  function(req ,res){
    models.Challenges.findAll()
    .then( result => res.send({code: 200, challenges: challenges}))
}

const getChallenge = function(req, res){
    const id = req.params.challenges
    models.Challenges.findOne({where: {id: id}})
    .then(result => res.send({code: 200, challenge: result}))
}

const createChallenge = function(req, res){
    const body = req.body
    const challenge = {
        routine_type: body.routine_type,
        object_unit: body.object_unit,
        quota: body.quota,
        exercise_type: body.exercise_type
    }
    
    try{
        models.Challenges.create(challenge)
        .then(result => res.send({ code:200, message: 'success' }))
    }
    catch(err){
        console.log(err)
    }
}

const deleteChallenge = function(req, res){
    const id = req.params.challenge
    models.Challenges.destroy({where: {id: id}})
    .then(result => res.send({code: 200, message: 'success'}))
}


module.exports = {
    getChallenges,
    getChallenge,
    createChallenge,
    deleteChallenge
}