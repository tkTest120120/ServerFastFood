const router = require('express').Router();

router.get("/" , (req , res)=>{
    res.render('index', {layout : false , a : "0000000000000000"});
});

module.exports = router;