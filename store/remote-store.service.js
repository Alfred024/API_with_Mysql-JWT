//Cambiar fecth por axios
const fetch = require('node-fetch');

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    async function list(table) {
        const response = await fetch(`${URL}/${table}`);
        const json = await response.json();
        return json.body;
    }

    async function get(table, id){
        const response = await fetch(`${URL}/${table}/${id}`);
        const json = await response.json();
        return json.body;
    }

    async function upsert(table, data){
        if(data.id){
            update(table, data);
        }else{
            insert(table, data);
        }
    }

    async function update(table, data){
        console.log(`UPDATE TABLE[${table}]`);
    }

    async function insert(table, data){
        console.log(`INSERT IN TABLE[${table}]`);
    }

    async function query(table, query, join){
        console.log(`QUERY AT TABLE[${table}]`);
    }

    //FETCH GENERAL DE LAS CONSULTAS
    async function request(table, method, ) {
        
    }

    return {
        list,
        get,
        upsert,
        query,
    }
}

module.exports = createRemoteDB;