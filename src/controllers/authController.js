const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Función para registrar un usuario
async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Buscamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ email });

    // Si ya existe, retornamos un error
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Si no existe, creamos un nuevo usuario
    const newUser = new User({
      name,
      email,
      password
    });

    // Guardamos el nuevo usuario en la base de datos
    await newUser.save();

    // Generamos un token para el nuevo usuario
    const token = jwt.sign({ id: newUser._id }, config.secret, {
      expiresIn: 60 * 60 * 24 // Caduca en 24 horas
    });

    // Enviamos el token y los datos del nuevo usuario como respuesta
    res.status(200).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
}

// Función para iniciar sesión
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email });

    // Si el usuario no existe, retornamos un error
    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // Verificamos si la contraseña es correcta
    const isMatch = await user.comparePassword(password);

    // Si la contraseña es incorrecta, retornamos un error
    if (!isMatch) {
      return res.status(400).json({ msg: 'La contraseña es incorrecta' });
    }

    // Generamos un token para el usuario
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24 // Caduca en 24 horas
    });

    // Enviamos el token y los datos del usuario como respuesta
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
}

module.exports = {
  register,
  login
};
