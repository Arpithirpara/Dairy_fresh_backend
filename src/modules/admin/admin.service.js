const Admin=require('./admin.model');
const bcrypt = require("bcryptjs");


const adminlogin=async (adminName,password)=>{

       //find admin
         const admin=await Admin.findOne({adminName});

         if(!admin){
          throw new Error("admin not found:");
         }

         //password check
         const ismath=await bcrypt.compare(password,admin.password);

         if(!ismath){
          throw new Error("invalid password!");

         }
         return admin;
   
};
module.exports={
  adminlogin,
}
