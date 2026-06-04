function register(req, res) {
  console.log(req.body);

  res.status(201).json({
    message: "Usuario recibido correctamente",
  });
}

module.exports = {
  register,
};