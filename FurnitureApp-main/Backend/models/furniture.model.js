// models/Furniture.js
import mongoose from "mongoose";
const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: true,trim:true },
    description: { type: String, required: true },
    price: { type: Number, required: true,min:0 },
    availability: { type: Boolean, default: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    city: { type: String},  
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }
},{timestamps:true});

const Furniture = mongoose.model('Furniture', furnitureSchema);

export default Furniture;