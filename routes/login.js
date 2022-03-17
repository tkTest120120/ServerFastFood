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

            connection.query("select * from usersFood", (err, users) => {
                if (err) {
                    console.log(err);
                    res.render('index', { layout: false, error: ['Lỗi đăng nhập'] });
                }

                let login = false;
                let admin = false;

                users.map((user, index) => {
                    if (tk === user.tk && mk === user.mk && user.permission === "admin") {
                        login = true;
                        admin = true;
                        return user;
                    } else if (user.permission == "food") {
                        admin = false;
                    } else {
                        return;
                    }

                });

                if (login) {
                    res.redirect("/users");
                } else {

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

        connection.query("select * from usersFood", (err, users) => {
            if (err) {
                console.log(err);
                res.render('ListUsers', { layout: false, error: ['Lỗi kết nối Database'] });
            }

            // console.log( users);

            res.render('ListUsers', { layout: false, data: users });
        });
    });
});

router.get("/deleteUser/:id", (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('delete from usersFood where id = ?', [id], (err, rows) => {
            if (err) throw err;

            res.redirect('/users');
        });
    });
});

router.post("/user", (req, res) => {
    const data = req.body;
    console.log(data);
    const user = {
        tk: data.tk,
        mk: data.mk,
        permission: data.permission
    };

    if (data.mk !== data.mk_repeat) {
        res.render('ListUsers', { layout: false, error2: ["2 mật khẩu không khớp nhau"] });
    } else if (data.permission === 'admin' || data.permission === 'food') {
        req.getConnection((err, connection) => {
            if (err) res.json(err);

            const query = connection.query("INSERT INTO `usersFood` set ? ", user, (err2, products) => {
                if (err2) res.json(err2);

                // console.log(products);
                res.redirect('/users');
            });
        });
    } else if (data.permission !== "admin" || data.permission !== "food") {
        res.render('ListUsers', { layout: false, error2: ["Bạn nhập sai quyền truy cập"] });
    }
});

router.get("/editUser/:id", (req, res) => {
    const { id } = req.params;
    console.log("============================   " + id);
    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('select * from usersFood WHERE id = ?', [id], (err, user) => {
            if (err) throw err;

            console.log(user[0]);
            res.render('editUser', {layout : false , data: user[0] });
        });
    });
});

router.post("/updateUser/:id", (req , res)=>{
    const {id} = req.params;
    const data = req.body;

    const newUser = {
        tk: data.tk,
        mk: data.mk,
        permission: data.permission
    };

    const data2 = {
        id : id,
        tk: data.tk,
        mk: data.mk,
        permission: data.permission
    };

    console.log(newUser);

    if (data.mk !== data.mk_repeat) {
        res.render('editUser', { layout: false, data : data2, error : ["2 mật khẩu không khớp nhau"] });
    } else if (data.permission === 'admin' || data.permission === 'food') {
        req.getConnection((err , connection)=>{
            if(err) throw err;

            connection.query('update usersFood set ? where id = ?' , [newUser , id] , (err , rows)=>{
                if(err) throw err;

                res.redirect('/users');
            });
        });
    } else if (data.permission !== "admin" || data.permission !== "food") {
        res.render('editUser', { layout: false,data : data2, error: ["Bạn nhập sai quyền truy cập"] });
    }
});

module.exports = router;