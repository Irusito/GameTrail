const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de nuevos usuarios
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validaciones

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }
    // La contraseña se almacena cifrada utilizando bcrypt.
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

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

// Inicio de sesión y generación del JWT
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

    const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login correcto",

  token,

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