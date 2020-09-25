var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'hari',
        server: 'DESKTOP-3U64GSU',
        database: 'hari',
        connectionTimeout: 999999999,
        requestTimeout: 999999999,
        options: {
            encrypt: false
        }
    });

    return conn;
};

module.exports = connect;