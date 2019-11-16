const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;


const getChallenges = async function(req ,res){
    const challenges = await models.Challenges.findAll();
    res.send( {data: challenges} );
}

const getChallenge = async function(req, res){
    const id = req.params.challenges;
    const challenge = await models.Challenges.findOne({where: {id: id}});
    res.send( {data: challenge} );
}

const createChallenge = async function(req, res){
    const body = req.body
    const challenge = {
        routine_type: body.routine_type,
        object_unit: body.object_unit,
        quota: body.quota,
        exercise_type: body.exercise_type,
        create_at: moment().format('YYYY-MM-dd')
    }
    
    try{
        const isExist = await models.Challenges.findOne({ where: 
            { [Op.and]: [ 
                { routine_type: challenge.routine_type },
                { object_unit: challenge.object_unit },
                { quota: challenge.quota }, 
                { exercise_type: challenge.exercise_type }
            ] }
        })
        
        if (isExist) {
            throw new Error('duplicate challenge')
        }
        else {
            const result = await models.Challenges.create(challenge)
            res.send({
                data: result
            })
        }
    }
    catch (err) {
        console.log(err)
        throw new Error('Cannot create challenge')
    }
}

const deleteChallenge = async function(req, res){
    const id = req.params.challenge
    const result = await models.Challenges.destroy({where: {id: id}})
    if (result) {
        res.send({data: result})
    }
    else throw new Error('Cannot delete challenge')
}


module.exports = {
    getChallenges,
    getChallenge,
    createChallenge,
    deleteChallenge
}