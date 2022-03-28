const router = require('express').Router();

router.post("/mobile/addUser", (req, res) => {
    const data = req.body;
    console.log(data);

    const userNew = {
        phone: data.phone,
        password : data.password,
        role: data.role,
        email: data.email,
        full_name: data.full_name,
        address: data.address,
        avatar: data.avatar,
        birthOfDate: null, /////////////////////////////
        sex: data.sex,
    };

    if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.send({error : "Lỗi kết nối database" , err : err});

            const query = connection.query("INSERT INTO `Users` set ? ", userNew, (err2, user) => {
                if (err2){
                    // console.log(err2.errno);
                    // if(err2.errno === 1062) res.send({
                    //     signUp : false,
                    //     error : "Phone này đã tồn tại",
                    // });

                    // res.send({signUp : false, error : "Lỗi đăng ký"});
                    res.json(err2);
                } else {

                    // console.log(products);
                    res.status(200).send({...user , user : userNew , signUp : true});
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
        if (err) throw err;

        connection.query("select * from Users", (err, users) => {
            if (err) {
                console.log(err);
                res.send({error : err});
            }

            let login = false;
            let admin = false;

            const a = users.filter((user, index) => {
                if (tk === user.phone && mk === user.password && user.role === "food") {
                    login = true;
                    admin = true;
                    return user;
                }
                else if (tk === user.phone && mk === user.password) {
                    admin = false;
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