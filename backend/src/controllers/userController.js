import { ReasonPhrases, StatusCodes } from "http-status-codes";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    await newUser.hashPassword();

    const result = await newUser.save();

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Register successful.",
      data: result,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email }, { __v: 0 });

    if (!user) throw new Error("Invalid email");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new Error("Invalid password");

    const token = await user.generateToken();

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Login successful.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // const id = req.id;

    const { name, email, password } = req.body;

    // const user = await User.findOne({ _id: id });

    // if (password) await user.hashPassword(password);
    if (password) await req.user.hashPassword(password);

    const data = await req.user.updateOne(
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Data updated successfully",
      data,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const logout = async (req, res, next) => {
  try {
    await req.user.deleteToken(req.token);

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Logout successfully",
      data: null,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    // const id = req.id;

    // const foundUser = await User.findOne({ _id: id });

    // await foundUser.deleteToken();

    await req.user.deleteToken();

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Logout from all devices successfully",
      data: null,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.id;

    const foundUser = await User.findOne({ _id: id });

    if (!foundUser) throw new Error("User doesn't exist");
    const data = await foundUser.deleteOne({ _id: id });

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Data deleted successfully",
      data,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};
