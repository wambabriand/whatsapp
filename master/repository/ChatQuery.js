const mysql = require('mysql');
const { executeQueryAsync } = require('./dbConnection');


const getChatsByUserId = async (userid) => {
    const query = `SELECT * FROM w_chat WHERE user_id = ?`;
    const inserts = [userid];
    const tmp = mysql.format(query, inserts);
    return await executeQueryAsync(tmp);
}

const updateCateegory = async (data) => {
    const { jid, user_id, category } = data || {};
    if(!jid || !category || !user_id){
        return [];
    }
    const query = `UPDATE w_chat SET category = ? WHERE jid = ? AND user_id = ? ; `;
    const inserts = [category, jid, user_id];
    const tmp = mysql.format(query, inserts);
    const res = await executeQueryAsync(tmp);
    return res;
}

const getwChatById = async (jid, userid) => {
    const query = `SELECT * FROM w_chat WHERE user_id = ? AND jid = ?; `;
    const inserts = [userid, jid];
    const tmp = mysql.format(query, inserts);
    const res = await executeQueryAsync(tmp);
    return res;
}

const savewChat = async (userid, data) => {
    const { jid, name } = data || {};

    if(!jid || !name || !userid){
        return [];
    }
    const rows = await getwChatById(jid, userid);
    let query, inserts;
    if(rows.length < 1){
        query =`INSERT INTO w_chat(jid, user_id, name) VALUES (?,?,?);`;
        inserts = [jid, userid, name];
    } else {
        query =`UPDATE  w_chat SET name = ? WHERE jid = ? AND user_id = ?`;
        inserts = [name, jid, userid];
    }
    const tmp = mysql.format(query, inserts);
    const res = await executeQueryAsync(tmp);
    return res;
}

const insertChat = async (jid, userid, name) => {
    const query =`
        INSERT INTO w_chat(jid, user_id, name) VALUES (${jid},${userid},${name});
    `;
    const res = await executeQueryAsync(query);
    return res;
}

module.exports = {
    getChatsByUserId,
    insertChat,
    savewChat,
    updateCateegory
}
