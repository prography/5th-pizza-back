import { Router } from 'express';
import RecordController from '../controllers/RecordController';

const router = Router();

router.get('', RecordController.getRecords);
router.get('/:recordId', RecordController.getRecord);
router.post('', RecordController.createRecord);
router.delete('/:recordId', RecordController.deleteRecord);

export default router;
