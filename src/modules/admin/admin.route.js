const express=require('express');
const {loginadmin}=require('../admin/admin.controller');

const router=express.Router();

router.post('/login',loginadmin);

module.exports=router;
