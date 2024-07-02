import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,lowercase:true},
    phoneNo: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! It must be 10 digits long.`
        }
        },
    avatar:{type:String,required:true},
    password:{type:String},
    isNewUser: { type: Boolean, default: true } // Add this field
},{timestamps:true})

const User=mongoose.model("User",userSchema);
export default User;