const sequelize = require('sequelize')
const models = require('../models')
const moment = require('moment')
const Op = sequelize.Op;

const getRecords = async function(req, res){
    const records = await models.Records.findAll()
    res.send({ data: records })
}

const getRecord = async function(req, res){
    const id = req.params.record;
    const record = await models.Records.findOne( { where: { id: id } } );
    if (record) res.send( { data: record } );
    else throw new Error('There is no record');
}

const createRecord = async function(req, res){
    const body = req.body;
    const record = {
        running_type: body.running_type,
        distance: body.distance,
        created_at: moment().format('YYYY-MM-DD')
    }
    const result = await models.Records.create(record)
    if (result) res.send( { data: result } )
    else throw new Error 

}

const deleteRecord = async function(req, res){

}

module.exports = {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord
}