import { Router } from 'express';
import authUtil from '../middlewares/VerifyToken';
import challenge from './challenge';
import record from './record';
import user from './user';
import auth from './auth';
import badge from './badge';
import job from './job';

const router = Router();        

router.get('/policy', function(req, res){
    res.render('privacyPolicy', { title: '개인정보보호정책' })
})

router.use('/auth', auth);
router.use('/jobs', job);
router.use(authUtil.verifyToken);

router.use('/challenges', challenge);
router.use('/records', record);
router.use('/user', user);
router.use('/badges', badge);

export default router;
