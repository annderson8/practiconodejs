const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function handleCon () {
    connection = mysql.createConnection(dbConfig);
    connection.connect(err => {
        if(err){
            console.error('[db error]', err);
        setTimeout(handleCon, 2000);
        }else{
            console.log('DB Connected');
        }
        
    });
    connection.on('error', err => {
        console.error('[db error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw err;
        }
    });
}

handleCon();

function list(tabla){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${tabla}`,(error, data) => {
            if(error) return reject(error);
            resolve(data);
        })
    })
}
function get(tabla, id){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`,(error, data) => {
            if(error) return reject(error);
            resolve(data);
        })
    })
}

function insert(tabla, data){
    console.log(tabla);
    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${tabla} SET ?`, data ,(error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}
function update(tabla, data){
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${tabla} SET ? WHERE id=?`,[data, data.id]  ,(error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}
// async function upsert(table, data){
//   
// }

async function upsert(table, data){
    return new Promise ((resolve, reject) =>{
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, data) => {
            if(error) {
                return reject(error);
            }
            resolve(data);
        })        
    })
}

async function remove(tabla, id){
    let col = await list(tabla)
    return true;
}
function query(table, query, join) {
        let joinQuery = '';
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }    
        return new Promise((resolve, reject) =>{
            connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error, result) => {
            if(error) return reject(error);
            result = JSON.stringify(result[0])
            result = JSON.parse(result)
            resolve(result || null);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}