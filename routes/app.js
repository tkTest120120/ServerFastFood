const router = require('express').Router();

router.get("/" , (req , res)=>{
    res.render('index', {layout : false });
});

router.get("/test" , (req , res)=>{
    res.render("./MonAn/addMonAn" , {layout : false});
});

module.exports = router;