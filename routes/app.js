const router = require('express').Router();

router.get("/" , (req , res)=>{
    res.render('index', {layout : false });
});

module.exports = router;