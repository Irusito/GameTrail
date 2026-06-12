/*
  Controlador de videojuegos.

  Gestiona las operaciones CRUD de la biblioteca
  asociada al usuario autenticado.
*/

const Game = require("../models/Game");
//CRUD

//READ
const getGames = async (req, res) => {
  try {
    const games = await Game.find({
  user: req.user.id,
});

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener videojuegos",
    });
  }
};
//CREATE
const createGame = async (req, res) => {
  try {
    const game = await Game.create({
  ...req.body,
  user: req.user.id,
});

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear videojuego",
    });
  }
};
//UPDATE
const updateGame = async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!game) {
      return res.status(404).json({
        message: "Videojuego no encontrado",
      });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar videojuego",
    });
  }
};
//DELETE
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!game) {
      return res.status(404).json({
        message: "Videojuego no encontrado",
      });
    }

    res.status(200).json({
      message: "Videojuego eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar videojuego",
    });
  }
};

module.exports = {
  createGame,
  getGames,
  updateGame,
  deleteGame,
};