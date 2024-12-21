import { v2 as cloudinary } from "cloudinary"; // Corrected typo
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME, // Corrected typo (cloudname -> cloud_name)
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.error("Error uploading media:", error); // More detailed error logging
    throw new Error("Failed to upload media");
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting media:", error); // More detailed error logging
    throw new Error("Failed to delete media");
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.error("Error deleting video:", error); // More detailed error logging
    throw new Error("Failed to delete video");
  }
};
