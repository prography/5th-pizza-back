const { Router } = require('express');
const router = Router();        
const authUtil = require('../middlewares/VerifyToken');
const challenge = require('./challenge');
const record =  require('./record');
const user = require('./user');
const auth = require('./auth');
const badge = require('./badge');

router.get('/policy', function(req, res){
    res.render('privacyPolicy', { title: '개인정보보호정책' })
})

router.use('/auth', auth);
router.use(authUtil.verifyToken);

router.use('/challenges', challenge);
router.use('/records', record);
router.use('/user', user);
router.use('/badge', badge);

module.exports = router;