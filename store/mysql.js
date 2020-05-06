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

function list(table){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table}`,(error, data) => {
            if(error) return reject(error);
            resolve(data);
        })
    })
}
function get(table, id){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`,(error, data) => {
            if(error) return reject(error);
            resolve(data);
        })
    })
}

function insert(table, data){
    console.log(table);
    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${table} SET ?`, data ,(error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}
function update(table, data){
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id]  ,(error, result) => {
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

async function remove(table, id){
    let col = await list(table)
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