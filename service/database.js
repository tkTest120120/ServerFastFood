const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '37.59.55.185',
    user: 'JnWiETIzRg',
    password: '47tKHpVqR3',
    port: 3306,
    database: 'JnWiETIzRg'
});

connection.connect( err => {
    if(err) console.log(err);

    console.log(" Kết nối thành công ");
});

module.exports = connection;