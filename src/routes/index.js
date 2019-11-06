const { Router } = require('express');
const router = Router();
const models = require('../models');         
const challenge = require('./challenge');
const record =  require('./record');


// router.use('/challenges', challenge);
// router.use('records', record);

router.get('/', function(req, res){
    res.send({message: 'TEST'});
})

module.exports = router;