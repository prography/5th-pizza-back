import { Record } from '../models';
import moment from 'moment';

const getRecords = async function(req, res){
    const user = req.user
    const records = await Record.findAll({ 
        where: { user_id: user.id }, 
        order: [['created_at', 'DESC']]
    });
    res.send({ data: records });
}

const getRecord = async function(req, res){
    const id = req.params.recordId;
    const record = await Record.findOne({ where: { id: id } });
    if (record) {
        res.send({ data: record });
    }
    else {
        throw new Error('record does not exist');
    }
}

const createRecord = async function(req, res){
    const body = req.body;
    const record = {
        user_id: req.user.id,
        challenge_id: body.challenge_id,
        running_time: body.running_time,
        distance: body.distance,
        screenshot: body.screenshot,
        created_at: moment()
    }
    const result = await Record.create(record)
    if (result) {
        res.send({ data: result });
    } 
    else {
        throw new Error('Cannot create record');
    }
}

const deleteRecord = async function(req, res){
    const id = req.params.recordId
    const result = await Record.destroy({ where: { id: id } })
    if (result) {
        res.send({ data: result })
    }
    else {
        throw new Error('Cannot delete record')
    }
}

export default {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord
}