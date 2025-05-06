const express = require('express')
const User = require('../models/user')
const { validationResult, body } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

//create user
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
      const salt = await bcrypt.genSalt(10)
      const hasPass = await bcrypt.hash(req.body.password,salt)
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: hasPass
      })

      const data = {
         user:{
            id:user.id
         }
      }
      const authtoken = jwt.sign(data,process.env.JWT_SECRET)
      res.json({
         success:true,
         message:authtoken
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).send({error})
   }

})



// user login
router.post('/login', [
   body('email','Enter valid email').isEmail(),
   body('password','Enter password').exists()
], async (req,res)=>{
   const error = validationResult(req)
   if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
   }

   const {email,password} = req.body
   try {
      const user = await User.findOne({email})
      if(!user){
         return res.json({
            success:false,
            message:"Invalid credentials"
         })
      }

      const userPassword = await bcrypt.compare(password,user.password)
      if(!userPassword){
         return res.json({
            success:false,
            message:"Invalid credentials"
         })
      }

      const data = {
         user:{
            id:user.id
         }
      }
      const authtoken = jwt.sign(data,process.env.JWT_SECRET)
      res.json({
         success:true,
         message:authtoken
      })

   } catch (error) {
      console.log(error)
      res.send(500).send({error})
   }
})

// get user loggedin details

router.post('/getuser', fetchuser, async (req,res)=>{
   try {
      if(!req.user){
         return res.status(401).json({ error: "User not found in request" });
      }
      const  userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.json(user)
   } catch (error) {
      console.log(error)
      res.send(500).send({error})
   }
})

module.exports = router