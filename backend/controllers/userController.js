const User = require("../models/User");
const Game = require("../models/Game");

const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const games = await Game.find({
      user: user._id,
    });

    res.status(200).json({
      user,
      games,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener perfil",
    });
  }
};

module.exports = {
  getPublicProfile,
};