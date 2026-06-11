const express = require("express");
const router = express.Router();

const {
  searchGames,
} = require("../controllers/rawgController");

router.get("/search", searchGames);

module.exports = router;