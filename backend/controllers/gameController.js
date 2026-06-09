const Game = require("../models/Game");
const getGames = async (req, res) => {
  try {
    const games = await Game.find();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener videojuegos",
    });
  }
};

const createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear videojuego",
    });
  }
};

module.exports = {
  createGame,
  getGames,
};