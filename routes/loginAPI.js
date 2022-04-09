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

router.get("/api/users", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from Users", (err, users) => {
            if (err) res.json(err);

            // console.log( users);

            res.json(users);
        });
    });
});

router.post("/api/deleteUser", (req, res) => {
    const { phone } = req.body;

    console.log(req.body);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('delete from Users where phone = ?', [phone], (err, rows) => {
            if (err) res.json(err);

            res.json({delete : true , phone : phone});
        });
    });
});

// router.get("/addUser" , (req , res)=>{
//     res.render("addUser" , {layout : false});
// });

router.post("/api/addUser", (req, res) => {
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

    if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.json(err);

            const query = connection.query("INSERT INTO `Users` set ? , createTime = CURRENT_TIMESTAMP", user, (err2, user) => {
                if (err2) res.json(err2);

                // console.log(products);
                res.json({...user ,addUser : true , newUser : user});
            });
        });
    } else if (data.role !== "admin" || data.role !== "food") {
        res.json({addUser : false , error: "Bạn nhập sai quyền truy cập"});
    }
});

router.post("/api/geteditUser", (req, res) => {
    const { phone } = req.body;
    console.log("======================================================   " + phone);

    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('select * from Users WHERE phone = ?', [phone], (err, user) => {
            if (err) throw err;

            console.log(user[0]);
            res.json(user[0]);
        });
    });
});

router.post("/api/updateUser", (req, res) => {
    const { phone } = req.body;
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

    if (data.role === 'admin' || data.role === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.json(err);

            connection.query('update Users set ? where phone = ?', [newUser, phone], (err, rows) => {
                if (err) res.json(err);

                res.json({...rows , updateUser : true , newUser : newUser});
            });
        });
    } else if (data.permission !== "admin" || data.permission !== "food") {
        res.json({error : "Bạn nhập sai quyền truy cập" , updateUser : false});
    }
});

module.exports = router;