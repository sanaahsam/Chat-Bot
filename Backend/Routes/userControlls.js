import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../Token/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { email, username, confirmpassword, password, gender } = req.body;

    //checking of the pasword and confirmpassword match

    if (password !== confirmpassword) {
      return Error("pasword do not match");
    }

    //checking if email already exist
    const user = await User.findOne({ email });
    if (user) {
      throw Error("Email is in use");
    }

    const boypfppic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlpfppic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedpassword,
      gender,
      profilepic: gender === "Male" ? boypfppic : girlpfppic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        userName: newUser.username,
        profilepic: newUser.profilepic,
      });
    } else {
      throw Error("Inavlid user data");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//LOGIN -------------------------------------

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking if user entered right
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw Error("Incorrect pasword");
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      userName: user.username,
      Profilepic: user.profilepic,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout succesfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
