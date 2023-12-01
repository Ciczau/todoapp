//@ts-nocheck

import { users } from "../models/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateRefreshToken = (email, nick) => {
  return jwt.sign({ email, nick }, process.env.JWT_SECRET_KEY, {
    expiresIn: "864000s",
  });
};
export const generateAccessToken = (email, nick) => {
  return jwt.sign({ email, nick }, process.env.JWT_SECRET_ACCESS_KEY, {
    expiresIn: "15s",
  });
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.json({ success: false });
  const user = await users.findOne({ refreshToken: refreshToken });
  if (!user) return res.json({ success: false });
  const verifyToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
  if (!verifyToken) {
    return res.json({ success: false });
  } else {
    const accessToken = generateAccessToken(user.email, user.nick);

    return res.json({ token: accessToken, success: true });
  }
};

export const Register = async (req, res) => {
  const { email, nick, password } = req.body;
  if (!email || !nick || !password) return res.json({ success: false });
  const searchByEmail = await users.findOne({ email: email });
  if (searchByEmail) return res.json({ success: false });
  const searchByNick = await users.findOne({ email: email });
  if (searchByNick) return res.json({ success: false });

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const refreshToken = generateRefreshToken(email, nick);
  await users.insertOne({
    email: email,
    nick: nick,
    refreshToken: refreshToken,
    password: encryptedPassword,
  });
  return res.json({ success: true });
};

export const Login = async (req, res) => {
  const { nick, password } = req.body;
  if (!nick || !password) return res.json({ success: false });
  const User = await users.findOne({ nick: nick });
  if (!User) return res.json({ success: false });
  const comparePasswords = await bcrypt.compare(password, User.password);
  if (!comparePasswords) return res.json({ success: false });
  const refreshToken = generateRefreshToken(User.email, nick);
  await users.updateOne(
    {
      nick: nick,
    },
    { $set: { refreshToken: refreshToken } }
  );
  return res.send({ success: true, refreshToken: refreshToken });
};
