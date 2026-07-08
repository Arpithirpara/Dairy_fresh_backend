const payment=require('./payment.model');

//cretae payment:
const createpayment = async (data) => {
  const { order_id, user_id, amount, p_method, razorpay_payment_id } = data;

  return await payment.create({
    order_id,
    user_id,
    amount,
    p_method,
    pstatus:        p_method === "Razorpay" ? "Success" : "Pending",
    transaction_id: p_method === "Razorpay" ? razorpay_payment_id : null,
  });
};

//get all payment 
   const getpayment=async()=>{
             return await payment.find()
             .populate("user_id")
             .populate("order_id")    
   }   

   //get payment by id
   const getpaymentById=async(id)=>{
       return await payment.findById(id)
       .populate("user_id")
       .populate("order_id")
   }

   // update payment
   
     const updatePayment=async(id ,data)=>{
        return await payment.findByIdAndUpdate(id,data,
            {new:true})
     }


   // delete payment:

   const deletePayment=async(id)=>{
    return await payment.findByIdAndDelete(id);
   }

   module.exports={
               createpayment,
               getpayment,
               getpaymentById,
               updatePayment,
               deletePayment,
   };