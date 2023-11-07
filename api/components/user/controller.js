const auth = require('../auth');

const TABLA = 'USER';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(user) {
        const newUser = {
            name: user.name,
            username: user.username,
        }   

        if(user.password || user.username){
            await auth.upsert({
                username: user.username,
                password: user.password,
            });
        }
        return store.upsert(TABLA, newUser);
    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; 
        const query = { user_from: user };

		return await store.query(TABLA + '_follow', query, join);
	}

    async function remove(id) {
        auth.remove(id);
        return await store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following,
        remove,
    };
}