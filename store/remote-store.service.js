const fetch = require('node-fetch');

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    async function list(table) {
        const response = await fetch(`${URL}/${table}`);
        response
            .then((response) =>{
                return response.json();
            })
            .then((json)=>{
                return json.body
            })
            .catch((error)=>{
                return 
            });
        const data = await response.json();
        return data;
    }

    async function get(table, id){

    }

    async function upsert(table, data){

    }

    async function query(table, query, join){

    }

    return {
        list,
        get,
        upsert,
        query,
    }
}

module.exports = createRemoteDB;