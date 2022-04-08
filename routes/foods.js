const router = require('express').Router();
const hdf = require('../service/handleFunction');

router.get("/loaiMon", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas) => {
            if (err) res.json(err);

            // console.log( users);

            res.render("listLoaiMon", { data: datas });
        });
    });

});

router.get("/addLoaiMon", (req, res) => {
    res.render("addLoaiMon");
});

router.post("/loaiMon", (req, res) => {
    const data = req.body;
    console.log(data);

    const loaiMon = {
        tenLoai: data.tenLoai,
        imgLoaiMon: data.imgLoaiMon,
    };

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("INSERT INTO `LoaiMon` set ?", loaiMon, (err2, products) => {
            if (err2) res.json(err2);

            res.send({ status: "xong", loaiMon: loaiMon });
        });
    });
});

router.get("/deleteLoaiMon/:idLoaiMon", (req, res) => {
    const { idLoaiMon } = req.params;

    console.log(idLoaiMon);

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
        tenLoai: data.tenLoai,
        imgLoaiMon: data.imgLoaiMon,
    };

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(data.tenLoai, idLoaiMon);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('update LoaiMon set ? where idLoaiMon = ?', [newLoaiMon, idLoaiMon], (err, rows) => {
            if (err) res.json(err);

            res.send({ status: "xong", newLoaiMon: newLoaiMon, error: 0 });
        });
    });
});

router.get("/monAn", (req, res) => {
    let listLoaiMon = [];
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas1) => {
            if (err) res.json(err);

            listLoaiMon = datas1;
        });

        connection.query("select * from MonAn", (err, datas) => {
            if (err) res.json(err);



            for (let i = 0; i < datas.length; i++) {
                const tenLoai = hdf.getTenLoaiMon(listLoaiMon , datas[i].idLoaiMon);
                datas[i].tenLoai = tenLoai;
            }

            res.render("./MonAn/listMonAn", { data: datas });
        });
    });
});

router.get("/addMonAn", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas) => {
            if (err) res.json(err);

            // console.log( users);

            res.render("./MonAn/addMonAn", { data: datas });
        });
    });
});

router.post("/addMonAn", (req, res) => {
    const data = req.body;
    console.log(data);

    const loaiMon = {
        tenMonAn: data.tenMonAn,
        idLoaiMon: data.idLoaiMon,
        gia: data.gia,
        soLuong: data.soLuong,
        moTa: data.moTa,
        img1: data.img1,
    };

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("INSERT INTO `MonAn` set ?", loaiMon, (err2, MonAns) => {
            if (err2) res.json(err2);

            res.send({...MonAns ,status: "xong" , addMonAn : true});
        });
    });
});

router.get("/deleteMonAn/:idMonAn", (req, res) => {
    const { idMonAn } = req.params;
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('delete from MonAn where idMonAn = ?', [idMonAn], (err2, rows) => {
            if (err2) res.json(err2);

            res.redirect('/monAn');
        });
    });
});

router.get("/editMonAn/:idMonAn", (req, res) => {
    const { idMonAn } = req.params;
    let listLoaiMon = [];
    console.log("======================================================   " + idMonAn);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas) => {
            if (err) res.json(err);

            // console.log( users);

            listLoaiMon = datas;
        });

        connection.query('select * from MonAn WHERE idMonAn = ?', [idMonAn], (err, data) => {
            if (err) res.json(err);

            for (let i = 0; i < data.length; i++) {
                const tenLoai = hdf.getTenLoaiMon(listLoaiMon , data[i].idLoaiMon);
                data[i].tenLoai = tenLoai;
            }

            res.render('./MonAn/editMonAn', { layout: false, data: listLoaiMon , listMonAn : data[0] });
        });
    });
});

router.post("/editMonAn/:idMonAn", (req, res) => {
    const { idMonAn } = req.params;
    const data = req.body;

    const newMonAn = {
        tenMonAn: data.tenMonAn,
        idLoaiMon: data.idLoaiMon,
        gia: data.gia,
        soLuong : data.soLuong,
        moTa : data.moTa,
        img1 : data.img1
    };

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(data.tenMonAn, idMonAn);

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('update MonAn set ? where idMonAn = ?', [newMonAn, idMonAn], (err, rows) => {
            if (err) res.json(err);

            res.send({ update : true, newMonAn: newMonAn, error: 0 });
        });
    });
});

module.exports = router;