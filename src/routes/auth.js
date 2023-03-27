const express = require('express');
const router = express.Router();

// ruta para mostrar la página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// ruta para procesar la solicitud de registro
router.post('/register', (req, res) => {
  // implementar la lógica de registro aquí
});

// ruta para mostrar la página de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login');
});

// ruta para procesar la solicitud de inicio de sesión
router.post('/login', (req, res) => {
  // implementar la lógica de inicio de sesión aquí
});

// ruta para cerrar sesión
router.get('/logout', (req, res) => {
  // implementar la lógica de cierre de sesión aquí
});

module.exports = router;
