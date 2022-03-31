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

module.exports = router;