const TABLA = 'post';
const nanoid = require('nanoid');
const error = require('../../../utils/error');

module.exports = function(injectedStore){

    let store = injectedStore;
    if (!store)store = require('../../../store/mysql');

    function list (){
        return store.list(TABLA);
    }

	async function get(id) {
		const user = await Store.get(TABLA, id);
		if (!user) {
			throw error('No existe el post', 404);
		}

		return user;
	}

	async function upsert(data, user) {
		const post = {
			id: data.id,
			user: user,
			text: data.text,
		}

		if (!post.id) {
			post.id = nanoid();
		}

		return Store.upsert(TABLA, post).then(() => post);
	}

	async function like(post, user) {
        const like = await Store.upsert(TABLA + '_like', {
            post: post,
            user: user,
        });

        return like;
	}

	async function postsLiked(user) {
		const users = await Store.query(TABLA + '_like', { user: user }, {post: post});
		return users;
	}

	async function postLikers(post) {
		const users = await Store.query(TABLA + '_like', { post: post }, {post: post});
		return users;
	}

    return {
		list,
		get,
		upsert,
		like,
		postsLiked,
		postLikers,
	}
}