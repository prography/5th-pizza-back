const { Router } = require('express');
const RecordController = require('../controllers/RecordController')

const router = Router();

router.get('', RecordController.getRecords);
router.get('/:recordId', RecordController.getRecord);
router.post('', RecordController.createRecord);
router.delete('/:recordId', RecordController.deleteRecord);

module.exports = router;