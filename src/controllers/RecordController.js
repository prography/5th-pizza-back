import { Record } from '../models';

const getRecords = async function(req, res){
    const user = req.user
    const records = await Record.findAll({ 
        where: { userId: user.id }, 
        order: [['created_at', 'DESC']]
    });
    res.send({ 
        data: transformRecords(records)
    });
}

const getRecord = async function(req, res){
    const id = req.params.recordId;
    const record = await Record.findOne({ where: { id: id } });
    if (record) {
        res.send({ data: transformRecord(record) });
    }
    else {
        throw new Error('record does not exist');
    }
}

const createRecord = async function(req, res){
    const body = req.body;
    const record = {
        userId: req.user.id,
        challengeId: body.challenge_id,
        runningTime: body.running_time,
        distance: body.distance,
        screenshot: body.screenshot,
    }
    const result = await Record.create(record)
    if (result) {
        res.send({ 
            data: transformRecord(result) 
        });
    } 
    else {
        throw new Error('Cannot create record');
    }
}

const deleteRecord = async function(req, res){
    const id = req.params.recordId
    const result = await Record.destroy({ where: { id } })
    if (result) {
        res.send({ 
            data: result
        })
    }
    else {
        throw new Error('Cannot delete record')
    }
}

const transformRecord = (record) => ({
    id: record.id,
    user_id: record.userId,
    challenge_id: record.challengeId,
    running_time: record.runningTime,
    distance: record.distance,
    screenshot: record.screenshot,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
});

export const transformRecords = (records) => records.map(transformRecord);

export default {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord
}