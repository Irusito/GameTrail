const searchGames = async (req, res) => {
  try {
    const query = req.query.q;

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${query}`
    );

    const data = await response.json();

    res.status(200).json(data.results);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al buscar videojuegos",
    });
  }
};

module.exports = {
  searchGames,
};