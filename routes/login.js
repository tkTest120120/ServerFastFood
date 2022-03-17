const router = require('express').Router();

router.post("/login" , (req , res)=>{
    const {tk , mk} = req.body;

    if( tk === '' || mk === ''){
        res.render('index', {layout : false , error : ['Không được để trống'] });
    } else if (tk === 'admin' && mk === 'admin'){
        res.render('index', {layout : false , notification : ['Đăng nhập thành công'] });
    } else {
        res.render('index', {layout : false , notification : ['Gửi thành công'] });
    }
    
    // res.send(req.body);
});

router.get("/users" , (req , res)=>{
    res.render('ListUsers' , {layout : false});
});

module.exports = router;