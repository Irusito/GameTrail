/*
  Middleware de autenticación.

  Verifica que el JWT enviado por el usuario sea válido
  antes de permitir el acceso a rutas protegidas.
*/
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const token = authHeader.split(" ")[1];

    // Comprueba que el token sea válido y no haya expirado.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token inválido",
    });
  }
};

module.exports = protect;