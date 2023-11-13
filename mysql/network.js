const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);


router.get('/:table/:id', async (req, res, next) => {
    const datos = await Store.get(req.params.table, req.params.id)
    response.succes(req, res, datos, 200);
});

router.get('/:table', async (req, res, next) => {
    const datos = await Store.list(req.params.table)
    response.succes(req, res, datos, 200);
});

router.post('/:table', async (req, res, next) => {
    const datos = await Store.insert(req.params.table, req.body)
    response.succes(req, res, datos, 200);
});

router.put('/:table', async (req, res, next) => {
    const datos = await Store.upsert(req.params.table, req.body)
    response.succes(req, res, datos, 200);
});

module.exports = router;