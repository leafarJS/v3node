const { Router } = require('express')
const { check } = require('express-validator');
const { login } = require('../controllers/authControllers');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post("/login",[
  check('email', 'El correo es un campo obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
],login);


module.exports = router

