const mongoose=require('mongoose');

const adminSchema= new mongoose.Schema({
  
      adminName:{
          type:String,
          required:true,
          trim:true,
      },
      password:{
            type:String,
            required:true,
            sellect:false,
      }
});
module.exports=mongoose.model(
        "Admin",
        adminSchema,
);