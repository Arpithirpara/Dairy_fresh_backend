const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
     order_id:
     {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true,
     },
     user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
     },
     amount:{
          type:Number, 
          required:true,
     } ,

     p_method:{
            type:String,
            enum:["Cash","Razorpay"],
              default: "cod",
     },
     pstatus:{
            type:String,
            enum:["Pending","Success","Failed"],
            default:"Pending",
            required:true,
     },
     transaction_id:{
      type:String,
     },
     pdate:{
       type:Date,
       default:Date.now,
     }
})

module.exports=mongoose.model("Payment",paymentSchema)