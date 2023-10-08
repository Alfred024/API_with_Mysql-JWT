const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// router.get('/', (req, res)=>{
//     Controller.list()
//         .then((lista) =>{
//             response.succes(req, res, lista,200);
//         })
//         .catch((err) =>{
//             response.error(req, res, err, 401);
//         });
// });

// router.get('/:id', (req, res)=>{
//     Controller.get(req.params.id)
//         .then((lista) =>{
//             response.succes(req, res, lista,200);
//         })
//         .catch((err) =>{
//             response.error(req, res, err, 401);
//         });
// });

router.post('/login', (req, res) =>{
    Controller.login(req.body.username, req.body.password)
        .then((token) =>{
            response.succes(req, res, token, 200);
        })
        .catch((err) =>{
            response.error(req, res, err, 400);
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