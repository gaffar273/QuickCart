
import mongoose from 'mongoose'

const addressSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    fullName:{
         type:String,
        required:true
    },
    phoneNumber:{
         type:String,
        required:true
    },
    hallOfResidence:{
         type:String,
        required:true
    }
})

const Address = mongoose.models.address || mongoose.model('Address', addressSchema);

export default Address