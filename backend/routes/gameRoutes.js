const express = require("express");

const router = express.Router();

const {
  createGame,
  getGames,
} = require("../controllers/gameController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getGames);
router.post("/", protect, createGame);

module.exports = router;