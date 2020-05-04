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
async function get(tabla, id){
    let col = await list(tabla)
    return col.filter(item => item.id === id)[0] || null;
}
async function upsert(tabla, data){
    if (!db[tabla]){
        db[tabla] = [];
    }
    db[tabla].push(data);
    console.log(db);
}
async function remove(tabla, id){
    let col = await list(tabla)
    return true;
}

async function query(tabla, q){
    let col = await list(tabla)
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}