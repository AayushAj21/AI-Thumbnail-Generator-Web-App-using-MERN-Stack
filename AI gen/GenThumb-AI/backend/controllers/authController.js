import User from "../models/User.js";
import generateToken from "../config/generateToken.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Auth with Google
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email } = ticket.getPayload();

    if (email_verified) {
      let user = await User.findOne({ email });

      if (user) {
        // User exists, log them in
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          credits: user.credits,
          token: generateToken(user._id),
        });
      } else {
        // Create new user
        // Generate a random password since they use Google
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);

        user = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          credits: user.credits,
          token: generateToken(user._id),
        });
      }
    } else {
      res.status(400).json({ message: "Google email verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
};

export { registerUser, authUser, getUserProfile, googleLogin };
