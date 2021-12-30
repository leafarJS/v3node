const Role = require("../models/rol");
const Usuario = require('../models/user')

const esRolValidado = async (rol = "") => {

  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`el ${rol} no esta registrado en la base de datos`);
  }
}

const existeEmail = async(email = '')=>{
  const mailExist = await Usuario.findOne({ email });
if (mailExist) {
  throw new Error(`El correo: ${email} ya se encuenta registrado`)
  }
}

const existeUsuarioID = async (is) => {
  const idExist = await Usuario.findById(id);
  if (!idExist) {
    throw new Error(`El id: ${id} yno existe`);
  }
};



module.exports = {
  esRolValidado,
  existeEmail,
  existeUsuarioID
};
