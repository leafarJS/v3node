const  validarCampos  = require("../middlewares/validarCampos");
const  validarJWT  = require("../middlewares/validarJWT");
const validarRoles  = require("../middlewares/validarRol");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles
}