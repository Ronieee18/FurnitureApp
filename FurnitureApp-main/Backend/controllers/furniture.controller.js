import Furniture from "../models/furniture.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadCloudinary.js";
export const  getFurniture=asyncHandler(async(req,res)=>{
    try {
        const furniture = await Furniture.find();
        res.json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export const addFurniture = asyncHandler(async (req, res) => {
    const { name, description, price, availability, category,city } = req.body;
    try {
        const images = [];

        if (req.files) {
            for (const file of req.files) {
                const uploadResponse = await uploadOnCloudinary(file.path);
                if (uploadResponse) {
                    images.push(uploadResponse.secure_url);
                }
            }
        }

        const furniture = new Furniture({ name, description, price, availability, images, category,user:req.user,city });
        await furniture.save();
        res.status(201).json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const deleteFurniture=asyncHandler(async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) {
            return res.status(404).json({ message: 'Furniture not found' });
        }
        await furniture.deleteOne();
        res.json({ message: 'Furniture removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const getFurnitureById=asyncHandler(async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) {
            return res.status(404).json({ message: 'Furniture not found' });
        }
        res.json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})