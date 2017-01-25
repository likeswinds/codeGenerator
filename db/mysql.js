module.exports = function(callback) {

    var mysql = require('mysql');
    var TEST_DATABASE = 'test';
    var TEST_TABLE = 'tables';
    //创建连接  
    var client = mysql.createConnection({
        user: 'root',
        password: '123',
        host: 'localhost',
    });
    client.connect();
    client.query("use " + TEST_DATABASE);
    console.log('12344')

    client.query(
            `SELECT * FROM ${TEST_TABLE}`,
            function selectCb(err, results) {
                if (err) {
                    throw err;
                }
                //console.log(JSON.stringify(results))
                client.end();
                callback(results)
            }
        )
        /**/
}