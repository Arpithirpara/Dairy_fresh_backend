const express=require('express');
const router=express.Router()
const {createpayment,getpayment,getpaymentById,updatePayment,deletepayment}=require('./payment.controller') 



router.post('/payment',createpayment);
router.get('/getpayment',getpayment);
router.get('/getpayment/:id',getpaymentById);
router.put('/update/:id',updatePayment);
router.delete('/delete/:id',deletepayment);

module.exports=router