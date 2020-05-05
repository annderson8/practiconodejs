const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router =  express.Router();
router.get('/', list);
router.get('/', secure('list'), list);
router.get('/like', secure('list_own'), postsLiked);
router.get('/:id', secure('get'), get);
router.post('/', secure('add',), upsert);
router.put('/', secure('update', { owner: 'user' }), upsert);
router.post('/:id/like', secure('add'), like);
router.get('/:id/like', secure('list'), postLikers)

function list(req, res, next){
    console.log('list in network user ' + req);
    Controller.list()
        .then(data =>{
            response.success(req, res, data, 200);
        })
        .catch(next);
}
function get(req, res, next) {
	Controller.get(req.params.id)
		.then(post => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}

function upsert(req, res, next) {
	Controller.upsert(req.body, req.user.id)
		.then(post => {
			response.success(req, res, post, 201);
		})
		.catch(next);
}

function like(req, res, next) {
	Controller.like(req.params.id, req.user.sub)
		.then(post => {
			response.success(req, res, post, 201);
		})
		.catch(next);
}

function postLikers(req, res, next) {
	Controller.postLikers(req.params.id)
		.then(post => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}

function postsLiked(req, res, next) {
	Controller.postsLiked(req.user.sub)
		.then(post => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}

module.exports = router;