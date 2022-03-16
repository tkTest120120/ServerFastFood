const router = require('express').Router();

router.get("/" , (req , res)=>{
    res.render('index', {layout : false });
});

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
})

module.exports = router;