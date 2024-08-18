import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const saltRounds = 10;
    const myPlaintextPassword = userData.password;
    userData.password = await bcrypt.hash(userData.password, saltRounds);
    // checking if user already exists on DB
    const userExists = await User.findOne({
      email: userData.email.toLowerCase(),
    });
    if (userExists) {
      res.status(409).send({ success: false, message: "User Already Exists" });
      return;
    }

    let newUser = await User(userData);
    await newUser.save();
    const jwtToken = await newUser.generateToken();
    res
      .status(200)
      .cookie("token", jwtToken, {
        path: "/",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "None",
      })
      .send({
        success: true,
        message: "Scccesfully registered",
        token: jwtToken,
      });
  } catch (error) {
    res.statusCode = 500;
    res.send(error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user) {
      res.status(401).send({ status: false, message: "Invalid Credentials" });
      return;
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).send({ status: false, message: "Invalid Password" });
        return;
      }
    }

    const jwtToken = await user.generateToken();
    res
      .status(200)
      .cookie("token", jwtToken, {
        path: "/",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .send({
        success: true,
        message: "Logged in Successfully",
        token: jwtToken,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getprofile = async (req, res) => {
  try {
    const userId = req.body.id;
    const userDetail = await User.findById(userId);

    res.status(200).send(userDetail);
  } catch (error) {
    res.statusCode = 500;
    res.send(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).send({ success: true, message: "Logged out Succesfully" });
  } catch (error) {
    res.statusCode = 500;
    res.send(error.message);
  }
};

export const verifyUser = async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await User.findById(userId);
    res
      .status(200)
      .send({ success: true, message: "You are verified", data: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
