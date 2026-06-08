const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

 const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  username,
  email,
  password: hashedPassword,
});

    res.status(201).json({
      message: "Usuario registrado",
      user,
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

module.exports = {
  register,
};