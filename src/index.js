const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const authRoutes = require('./routes/auth');

const app = express();

// Configuración de la base de datos
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((err) => console.error('Error al conectar a la base de datos', err));

// Configuración del middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de las rutas
app.use('/auth', authRoutes);

// Inicio del servidor
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
