require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const gameRoutes = require("./routes/gameRoutes");

const rawgRoutes = require("./routes/rawgRoutes");

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/rawg", rawgRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// Servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});