import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT } from "../config/config.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
      },
      message: ({ value: email }) => `${email} is not a valid email.`,
    },
    required: [true, "Email is required."],
    unique: [true, "Email must be unique."],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, JWT_SECRET);

  this.tokens.push(token);
  await this.save();

  return token;
};
userSchema.methods.hashPassword = async function (password) {
  const passwordToBeHashed = password || this.password;
  this.password = await bcrypt.hash(passwordToBeHashed, +SALT);

  console.log("inside password hash", this.password);

  password && (await this.save());
};

userSchema.methods.deleteToken = async function (token = null) {
  try {
    if (token) this.tokens = this.tokens.filter((t) => t !== token);
    else this.tokens = [];
    console.log("inside delete token", this.tokens);
    await this.save();
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
