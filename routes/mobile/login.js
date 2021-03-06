const router = require('express').Router();

router.post("/mobile/addUser", (req, res) => {
    const data = req.body;
    console.log(data);

    const userNew = {
        phone: data.phone,
        password : data.password,
        role: data.role,
        email: null,
        full_name: null,
        address: null,
        avatar: null,
        birthOfDate: null, /////////////////////////////
        sex: null,
    };

    if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.send({error : "Lỗi kết nối database" , err : err});

            const query = connection.query("INSERT INTO `Users` set ? , createTime = CURRENT_TIMESTAMP", userNew, (err2, user) => {
                if (err2){

                    res.json(err2);
                } else {

                    // console.log(products);
                    res.send({...user , user : userNew , signUp : true});
                }

            });
        });
    } else if (data.role !== "admin" || data.role !== "food") {
        res.send({
            status : "Đăng ký thất bại",
            error : "Bạn nhập sai quyền truy cập",
            signUp : false,
        });
    }
});

router.post("/mobile/login", (req, res) => {
    const { tk, mk } = req.body;

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from Users", (err, users) => {
            if (err) res.json(err);

            let login = false;

            const a = users.filter((user, index) => {
                if (tk === user.phone && mk === user.password && user.role === "food") {
                    login = true;
                    return user;
                }
                else if (tk === user.phone && mk === user.password) {
                    return user;
                } 
                // else {
                //     return;
                // }

            });

            console.log(a , "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

            if (login) {
                res.send({
                    login : true,
                    error : 0
                });
            } else if (a.length === 1){
                    res.send({
                        login : false,  
                        error : "Tài khoản không có quyền"
                    });
            }
            else {
                res.send({
                    login : false,
                    error : "Bạn nhập sai tài khoản hoặc mật khẩu"
                });
            }
        });
    });
});

module.exports = router;