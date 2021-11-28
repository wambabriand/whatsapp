const mysql = require('mysql');
const { executeQueryAsync } = require('./dbConnection');

const getSessionById = async (idUser) => {
    const query = `
        SELECT id, wabrowser_id,  wasecret_bundle, watoken1, watoken2 
        FROM gabri_user
        WHERE id = ${idUser} 
    `;
    const rows = await executeQueryAsync(query);
    if(rows.length !== 1){
        return null;
    } else {
        const { wabrowser_id,  wasecret_bundle, watoken1, watoken2 } = rows[0] || {};
        return ({
            WABrowserId: wabrowser_id,
            WASecretBundle: wasecret_bundle , 
            WAToken1: watoken1, 
            WAToken2: watoken2
        });
    }
}


const updateUserSession = async (idUser, session) => {
    const { WABrowserId, WASecretBundle, WAToken1, WAToken2 } = session;
    const inserts = [WABrowserId, WASecretBundle, WAToken1, WAToken2, idUser];

    const query = `
        UPDATE gabri_user 
        SET wabrowser_id = ?,  wasecret_bundle = ?, watoken1 = ?, watoken2 = ? 
        WHERE id = ? 
    `;
    const tmp = mysql.format(query, inserts);
    return await executeQueryAsync(tmp);
}

module.exports = {
    getSessionById,
    updateUserSession
}


