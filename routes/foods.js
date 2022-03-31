const router = require('express').Router();

router.get("/loaiMon" , (req , res) => {
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas) => {
            if (err) res.json(err);

            // console.log( users);

            res.render("listLoaiMon" , {layout : false ,data : datas });
        });
    });
    
});

router.get("/addLoaiMon" , (req , res) => {
    res.render("addLoaiMon" , {layout : false});
});

router.post("/loaiMon" , (req , res) => {
    const data = req.body;
    console.log(data);

    const loaiMon = {
        tenLoai : data.tenLoai,
        imgLoaiMon : data.imgLoaiMon,
    };

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("INSERT INTO `LoaiMon` set ?", loaiMon, (err2, products) => {
            if (err2) res.json(err2);

            res.send({status : "xong" , loaiMon : loaiMon});
        });
    });
});

router.get("/deleteLoaiMon/:idLoaiMon", (req, res) => {
    const { idLoaiMon } = req.params;
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('delete from LoaiMon where idLoaiMon = ?', [idLoaiMon], (err2, rows) => {
            if (err2) res.json(err2);

            res.redirect('/loaiMon');
        });
    });
});

router.get("/editLoaiMon/:idLoaiMon", (req, res) => {
    const { idLoaiMon } = req.params;
    console.log("======================================================   " + idLoaiMon);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('select * from LoaiMon WHERE idLoaiMon = ?', [idLoaiMon], (err, data) => {
            if (err) res.json(err);

            console.log(data[0]);
            res.render('editLoaiMon', { layout: false, data: data[0] });
        });
    });
});

router.post("/editLoaiMon/:idLoaiMon", (req, res) => {
    const { idLoaiMon } = req.params;
    const data = req.body;

    const newLoaiMon = {
        tenLoai : data.tenLoai,
        imgLoaiMon : data.imgLoaiMon,
    };

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log( data.tenLoai , idLoaiMon);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('update LoaiMon set ? where idLoaiMon = ?', [newLoaiMon, idLoaiMon], (err, rows) => {
            if (err) res.json(err);

            res.send({status : "xong" , newLoaiMon : newLoaiMon , error : 0});
        });
    });
});

module.exports = router;