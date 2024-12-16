const { Router } = require('express');
const { getAll, getFiltered, getById } = require('../controllers/joyas.controller');

const router = Router();

router.get('/', getAll);
router.get('/filtered', getFiltered);
router.get('/:id', getById);

module.exports = router;