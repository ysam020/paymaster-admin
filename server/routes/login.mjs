import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    bcrypt.compare(password, user.password, (passwordErr, passwordResult) => {
      if (passwordErr) {
        console.error(passwordErr);
        return res.status(500).json({ message: "Something went wrong" });
      }

      if (passwordResult) {
        // Create a new object with only the required fields
        const userResponse = {
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          username: user.username,
          role: user.role,
        };

        return res.status(200).json(userResponse);
      } else {
        return res
          .status(400)
          .json({ message: "Username or password didn't match" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
