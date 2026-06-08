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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    res.status(200).json({
      message: "Login correcto",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

module.exports = {
  register,
  login,
};