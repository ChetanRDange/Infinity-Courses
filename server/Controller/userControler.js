import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { uploadMedia ,deleteMediaFromCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashpassword,
      provider: "local",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incurrect email or password",
      });
    }

    if(user.provider !== "local"){
      return res.status(400).json({
        success:false,
        message:`Please login using ${user.provider} provider`
      })
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Incrrect email or password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxage: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const getUserProfile = async (req,res) => {
  try {
      const userId = req.id;
      const user = await User.findById(userId).select("-password").populate("enrolledCourses");
      if(!user){
          return res.status(404).json({
              message:"Profile not found",
              success:false
          })
      }
      return res.status(200).json({
          success:true,
          user
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"Failed to load user"
      })
  }
}

export const updateProfile = async (req, res) => {                                
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    // Rename variable from 'user' to 'foundUser' to avoid conflict with the 'User' model
    const foundUser = await User.findById(userId); 

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Extract public id of the old image from the URL if it exists
    if (foundUser.photoUrl) {
      const publicId = foundUser.photoUrl.split("/").pop().split(".")[0]; // Extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // Upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
