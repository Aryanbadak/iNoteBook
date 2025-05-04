const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    bodydata = req.body
    res.json({
        bodydata
    })
    console.log(bodydata)
})

module.exports = router