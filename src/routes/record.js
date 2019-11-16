const { Router } = require('express');
const RecordController = require('../controllers/RecordController')

const router = Router();

router.get('', RecordController.getRecords);
router.get('/:record', RecordController.getRecord);
router.post('', RecordController.createRecord);
router.delete('/:record', RecordController.deleteRecord);

module.exports = router;