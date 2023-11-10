const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');
const auth = require('./secure');

const router = express.Router();

router.get('/', auth('list'),(req, res, next)=> {
    Controller.list()
		.then(post => {
			response.succes(req, res, post, 200);
		})
		.catch(next);
});

router.get('/:id', auth('get'), (req, res, next) => {
	Controller.get(req.params.id)
		.then(post => {
			response.succes(req, res, post, 200);
		})
		.catch(next);
})

router.get('/like', auth('list_own'), (req, res, next) => {
    Controller.postsLiked(req.user.sub)
		.then(post => {
			response.succes(req, res, post, 200);
		})
		.catch(next);
});
    
router.get('/:id/like', auth('list'), (req, res, next) =>{
    Controller.postLikers(req.params.id)
        .then(post => {
            response.succes(req, res, post, 200);
        })
        .catch(next);
});

router.post('/', auth('add') ,(req, res, next)=> {
	Controller.upsert(req.body, req.user.id)
		.then(post => {
			response.succes(req, res, post, 201);
		})
		.catch(next);
});

router.put('/', auth('update', { owner: 'user' }), (req, res, next)=> {
	Controller.upsert(req.body, req.user.id)
		.then(post => {
			response.succes(req, res, post, 201);
		})
		.catch(next);
});

router.post('/:id/like', auth('add'),(req, res, next) =>{
	Controller.like(req.params.id, req.user.sub)
		.then(post => {
			response.succes(req, res, post, 201);
		})
		.catch(next);
})


module.exports = router;