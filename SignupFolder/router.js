const express=require('express');
const router=express.Router();
const Signup =require('./Signup.js')
router.route('/signup').post(Signup.signup);
router.route('/verify').post(Signup.verify);
module.exports=router;