const { Router } = require('express');
const router = Router();        
const challenge = require('./challenge');
const record =  require('./record');
const user = require('./user');
const auth = require('./auth');
const authUtil = require('../middlewares/AuthHelper');

router.get('/', function(req, res){
    res.send( { message: 'TEST' } );
})

router.use(authUtil.verifyToken);
router.use('/challenges', challenge);
router.use('/records', record);
router.use('/user', user);
router.use('/auth', auth);

module.exports = router;