const paymentService=require('./payment.service');

//create payment
const createpayment = async(req,res)=>{
  try{

    console.log("Payment body:", req.body);

    const payment =
      await paymentService.createpayment(
        req.body
      );

    console.log(
      "Saved payment:",
      payment
    );

    res.status(201).json({
      success:true,
      message:"Payment created successfully",
      data:payment
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
}

//get payment:
const getpayment=async(req,res)=>{
    try{
         const getpayment= await paymentService.getpayment();
         res.status(200).json({
          success:true,
          count:getpayment.length,
          data:getpayment
         })
    }
    catch(error){
         res.status(500).json({                               
            success: false,
            message: error.message,
        })
    }
}

//get paymentById
const getpaymentById=async(req,res)=>{
    try{
         const getpaymentById= await paymentService.getpaymentById(req.params.id);
         
         if(!getpaymentById){
          return res.status(404).json({
            success:false,
            message:"payment not found"
          }) 
         };
         res.status(200).json({
          success:true,
          data:getpaymentById
         });
         
    }
    catch(error){
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

//update payment

const  updatePayment=async(req,res)=>{
   try{
          const updatepayment=await paymentService.updatePayment(req.params.id,
            req.body
          );
          res.status(200).json({
            success:true,
            message:"payment update successfully!",
            data:updatepayment
          });

   }
   catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }     
}

//delete payment:

const deletepayment=async(req,res)=>{
       try{
           await paymentService.deletePayment(req.params.id);

           res.status(200).json({
            success:true,
            message:"payment deleted successfully!"
           })
       }
       catch(error){
        res.status(500).json({
          success:false,
          message:error.message
        })
 
       }
}

module.exports={
  createpayment,
  getpayment,
  getpaymentById,
  updatePayment,
  deletepayment
};

















