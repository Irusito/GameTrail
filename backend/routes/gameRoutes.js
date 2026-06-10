const express = require("express");

const router = express.Router();

const {
  createGame,
  getGames,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getGames);
router.post("/", protect, createGame);
router.put("/:id", protect, updateGame);
router.delete("/:id", protect, deleteGame);

module.exports = router;