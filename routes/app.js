const router = require('express').Router();

router.get("/" , (req , res)=>{
    res.send("data index");
});

module.exports = router;