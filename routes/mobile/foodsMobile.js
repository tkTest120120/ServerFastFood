const router = require('express').Router();
const hdf = require('../../service/handleFunction');

router.get("/mobile/loaiMon", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("select * from LoaiMon", (err, datas) => {
            if (err) res.json(err);

            // console.log( users);

            res.json(datas);
        });
    });

});

// router.get("/addLoaiMon", (req, res) => {
//     res.render("addLoaiMon", { layout: false });
// });

router.post("/mobile/addloaiMon", (req, res) => {
    const data = req.body;
    console.log(data);

    const loaiMon = {
        tenLoai: data.tenLoai,
        imgLoaiMon: data.imgLoaiMon,
    };

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("INSERT INTO `LoaiMon` set ?", loaiMon, (err2, data) => {
            if (err2) res.json(err2);

            res.send({...data , status: "xong", loaiMon: loaiMon , themLoaiMon : true});
        });
    });
});

router.post("/mobile/deleteLoaiMon", (req, res) => {
    const { idLoaiMon } = req.body;
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('delete from LoaiMon where idLoaiMon = ?', [idLoaiMon], (err2, rows) => {
            if (err2) res.json(err2);

            res.json({...rows , xoaLoaiMon : true});
        });
    });
});

// router.get("/editLoaiMon/:idLoaiMon", (req, res) => {
//     const { idLoaiMon } = req.params;
//     console.log("======================================================   " + idLoaiMon);

//     req.getConnection((err, connection) => {
//         if (err) res.json(err);

//         connection.query('select * from LoaiMon WHERE idLoaiMon = ?', [idLoaiMon], (err, data) => {
//             if (err) res.json(err);

//             console.log(data[0]);
//             res.render('editLoaiMon', { layout: false, data: data[0] });
//         });
//     });
// });

router.post("/mobile/editLoaiMon", (req, res) => {
    const data = req.body;
    const idLoaiMon = data.idLoaiMon;

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

            res.json({...rows, status: "xong", newLoaiMon: newLoaiMon, error: 0 , updateLoaiMon : true });
        });
    });
});

router.get("/mobile/monAn", (req, res) => {
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

            res.json(datas);
        });
    });
});

// router.get("/addMonAn", (req, res) => {
//     req.getConnection((err, connection) => {
//         if (err) res.json(err);

//         connection.query("select * from LoaiMon", (err, datas) => {
//             if (err) res.json(err);

//             // console.log( users);

//             res.render("./MonAn/addMonAn", { layout: false, data: datas });
//         });
//     });
// });

router.post("/mobile/addMonAn", (req, res) => {
    const data = req.body;
    console.log(data);

    const monAn = {
        tenMonAn: data.tenMonAn,
        idLoaiMon: data.idLoaiMon,
        gia: data.gia,
        soLuong: data.soLuong,
        moTa: data.moTa,
        img1: data.img1,
    };

    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query("INSERT INTO `MonAn` set ?", monAn, (err2, MonAns) => {
            if (err2) res.json(err2);

            res.send({...MonAns, monAn  ,status: "xong" , addMonAn : true});
        });
    });
});

router.post("/mobile/deleteMonAn", (req, res) => {
    const { idMonAn } = req.body;
    req.getConnection((err, connection) => {
        if (err) res.json(err);

        connection.query('delete from MonAn where idMonAn = ?', [idMonAn], (err2, rows) => {
            if (err2) res.json(err2);

            res.json({...rows , xoaMonAn : true});
        });
    });
});

// router.get("/editMonAn/:idMonAn", (req, res) => {
//     const { idMonAn } = req.params;
//     let listLoaiMon = [];
//     console.log("======================================================   " + idMonAn);

//     req.getConnection((err, connection) => {
//         if (err) res.json(err);

//         connection.query("select * from LoaiMon", (err, datas) => {
//             if (err) res.json(err);

//             // console.log( users);

//             listLoaiMon = datas;
//         });

//         connection.query('select * from MonAn WHERE idMonAn = ?', [idMonAn], (err, data) => {
//             if (err) res.json(err);

//             for (let i = 0; i < data.length; i++) {
//                 const tenLoai = hdf.getTenLoaiMon(listLoaiMon , data[i].idLoaiMon);
//                 data[i].tenLoai = tenLoai;
//             }

//             res.render('./MonAn/editMonAn', { layout: false, data: listLoaiMon , listMonAn : data[0] });
//         });
//     });
// });

router.post("/mobile/editMonAn", (req, res) => {
    const { idMonAn } = req.body;
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

            res.send({...rows, update : true, newMonAn: newMonAn, error: 0 });
        });
    });
});

module.exports = router;