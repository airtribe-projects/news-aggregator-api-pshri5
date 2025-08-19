// controllers/user.controller.js
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

// Register a new user
export const signup = async (req, res) => {
  try {
    const { username, email, password, preferences } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      })
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      preferences: preferences || undefined
    })

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // Remove password from response
    user.password = undefined

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token
    })
  } catch (error) {
    console.error("Signup error:", error)
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message
    })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    // Check password
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // Remove password from response
    user.password = undefined

    // Set cookie for token
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }

    return res.status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message: "Login successful",
        user,
        token
      })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    })
  }
}

// Get user preferences
export const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id
    
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      preferences: user.preferences
    })
  } catch (error) {
    console.error("Get preferences error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to get preferences",
      error: error.message
    })
  }
}

// Update user preferences
export const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id
    const { categories, country } = req.body
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        'preferences.categories': categories || undefined,
        'preferences.country': country || undefined
      },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      preferences: updatedUser.preferences
    })
  } catch (error) {
    console.error("Update preferences error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      error: error.message
    })
  }
}
