// controllers/foodController.js
import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises for better file management

const addFood = async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food_images", // Optional folder in Cloudinary
    });

    // Remove the local file after upload
    await fs.unlink(req.file.path);

    // Create the food item with the Cloudinary URL
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // Save the Cloudinary URL in the database
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving foods" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error removing food item' });
    }
};


export { addFood, listFood, removeFood };
