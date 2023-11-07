const express = require('express');

const response = require('../../../network/response');
const secure = require('./secure');
const Controller = require('./index');

const router = express.Router();

router.get('/', (req, res)=>{
    Controller.list()
        .then((data) =>{
            response.succes(req, res, data,200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

router.get('/:id', (req, res)=>{
    Controller.get(req.params.id)
        .then((data) =>{
            response.succes(req, res, data,200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

router.get('/:id/following', (req, res)=>{
    Controller.following(req.params.id)
        .then((data) =>{
            response.succes(req, res, data,200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

router.post('/', (req, res) =>{
    Controller.upsert(req.body)
        .then((user) =>{
            response.succes(req, res, user, 200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

router.post('/follow/:id', secure('follow'), (req, res, next) =>{
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
});

router.put('/', 
    secure('update'), 
    (req, res) =>{
    Controller.upsert(req.body)
        .then((user) =>{
            response.succes(req, res, user, 200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

router.delete('/:id', (req, res) =>{
    Controller.remove(req.params.id)
        .then((user) =>{
            response.succes(req, res, user,200);
        })
        .catch((err) =>{
            response.error(req, res, err, 401);
        });
});

module.exports = router;