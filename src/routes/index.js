const { Router } = require('express');
const router = Router();        
const authUtil = require('../middlewares/VerifyToken');
const challenge = require('./challenge');
const record =  require('./record');
const user = require('./user');
const auth = require('./auth');
const badge = require('./badge');

router.get('/', function(req, res){
    res.send( { message: 'TEST' } );
})

router.use('/auth', auth);
router.use(authUtil.verifyToken);

router.use('/challenges', challenge);
router.use('/records', record);
router.use('/user', user);
router.user('/badge', badge);

module.exports = router;