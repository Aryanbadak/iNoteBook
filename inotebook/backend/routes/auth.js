const express = require('express')
const User = require('../models/user')
const { validationResult, body } = require('express-validator')
const user = require('../models/user')
const router = express.Router()

router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter valid email').isEmail(),
   body('password', 'Enter must be at least 8 ch').isLength({ min: 8 })
], async (req, res) => {
      const error = validationResult(req)
      if (!error.isEmpty()) {
         return res.status(400).json({ error: error.array() })
      }
      try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
         return res.json({
            success: false,
            message: "User allredy exits"
         })
      }
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      })
      res.json(user)
   } catch (error) {
      console.log(error)
      res.status(500).send({error})
   }

})

module.exports = router