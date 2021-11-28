const mysql = require('mysql');
const { executeQueryAsync } = require('./dbConnection');

const findMessageForToday = async () => {
    const query = `
        SELECT *
        FROM contain
        WHERE 
    `;

}

module.exports = {
    findMessageForToday
};
