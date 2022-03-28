const router = require('express').Router();

router.post("/login", (req, res) => {
    const { tk, mk } = req.body;

    if (tk === '' || mk === '') {
        res.render('index', { layout: false, error: ['Không được để trống'] });
    } else if (tk === 'admin' && mk === 'admin') {
        // res.render('index', {layout : false , notification : ['Đăng nhập thành công'] });
        res.redirect("/users");
    } else {
        req.getConnection((err, connection) => {
            if (err) throw err;

            connection.query("select * from Users", (err, users) => {
                if (err) {
                    console.log(err);
                    res.render('index', { layout: false, error: ['Lỗi đăng nhập'] });
                }

                let login = false;
                let admin = false;

                const a = users.filter((user, index) => {
                    if (tk === user.phone && mk === user.password && user.role === "admin") {
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
                    res.redirect("/users");
                } else if (a.length === 1){
                        res.render('index', {layout : false , error : ["Tài khoản không có quyền admin"] });
                }
                else {

                    // if(! admin){
                    //     res.render('index', {layout : false , error : ['Bạn nhập sai tài khoản hoặc mật khẩu',"Tài khoản không có quyền admin"] });
                    // }
                    res.render('index', { layout: false, error: ['Bạn nhập sai tài khoản hoặc mật khẩu'] });
                }
            });
        });
    }

    // res.send(req.body);
});

router.get("/users", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("select * from Users", (err, users) => {
            if (err) {
                console.log(err);
                res.render('ListUsers', { layout: false, error: ['Lỗi kết nối Database'] });
            }

            // console.log( users);

            res.render('ListUsers', { layout: false, data: users });
        });
    });
});

router.get("/deleteUser/:phone", (req, res) => {
    const { phone } = req.params;
    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('delete from Users where phone = ?', [phone], (err, rows) => {
            if (err) throw err;

            res.redirect('/users');
        });
    });
});

router.get("/addUser" , (req , res)=>{
    res.render("addUser" , {layout : false});
});

router.post("/addUser", (req, res) => {
    const data = req.body;
    console.log(data);

    const user = {
        phone : data.phone,
        password: data.password,
        role: data.role,
        email: data.email,
        full_name : data.full_name,
        address : data.address,
        avatar : data.avatar,
        birthOfDate : null, /////////////////////////////
        sex : data.sex,
    };

    if (data.password !== data.mk_repeat) {
        res.render('addUser', { layout: false, error: ["2 mật khẩu không khớp nhau"] });
    } else if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.json(err);

            const query = connection.query("INSERT INTO `Users` set ? , createTime = CURRENT_TIMESTAMP", user, (err2, products) => {
                if (err2) res.json(err2);

                // console.log(products);
                res.redirect('/users');
            });
        });
    } else if (data.role !== "admin" || data.role !== "food") {
        res.render('addUser', { layout: false, error: ["Bạn nhập sai quyền truy cập"] });
    }
});

router.get("/editUser/:phone", (req, res) => {
    const { phone } = req.params;
    console.log("======================================================   " + phone);

    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('select * from Users WHERE phone = ?', [phone], (err, user) => {
            if (err) throw err;

            console.log(user[0]);
            res.render('editUser', { layout: false, data: user[0] });
        });
    });
});

router.post("/updateUser/:phone", (req, res) => {
    const { phone } = req.params;
    const data = req.body;

    const newUser = {
        password: data.password,
        role: data.role,
        email: data.email,
        full_name : data.full_name,
        address : data.address,
        avatar : data.avatar,
        birthOfDate : null,
        sex : data.sex,
    };

    const data2 = {
        phone : phone,
        password: data.password,
        role: data.role,
        email: data.email,
        full_name : data.full_name,
        address : data.address,
        avatar : data.avatar,
        birthOfDate : data.birthOfDate,
        sex : data.sex,
    };

    // console.log(data);

    if (data.password !== data.mk_repeat) {
        res.render('editUser', { layout: false, data: data2, error: ["2 mật khẩu không khớp nhau"] });
    } else if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) throw err;

            connection.query('update Users set ? where phone = ?', [newUser, phone], (err, rows) => {
                if (err) throw err;

                res.redirect('/users');
            });
        });
    } else if (data.permission !== "admin" || data.permission !== "food") {
        res.render('editUser', { layout: false, data: data2, error: ["Bạn nhập sai quyền truy cập"] });
    }
});

module.exports = router;