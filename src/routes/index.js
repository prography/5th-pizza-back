const { Router } = require('express');
const router = Router();        
const challenge = require('./challenge');
const record =  require('./record');
//const user = require('./user');

router.use('/challenges', challenge);
router.use('/records', record);
//router.use('/user', user);

router.get('/', function(req, res){
    res.send( {message: 'TEST'} );
})

module.exports = router;