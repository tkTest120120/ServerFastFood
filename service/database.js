// Tham Chiếu thư viện
var mysql = require('mysql')
// Lấy thông tin kết nối
var connect = mysql.createConnection({
    host : '37.59.55.185',
    user : 'JnWiETIzRg',
    password : '47tKHpVqR3',
    port : 3306,
    database : 'JnWiETIzRg'
});
// Kết nối đến Database và thêm dữ liệu (insert data)
connect.connect((error)=>{
    if( error ){
        console.log(error)
    }

    console.log(" Kết nối thành công ");
});

module.exports = connect;