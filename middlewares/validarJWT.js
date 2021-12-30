const { request, response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require('../models/user')

const validarJWT = async(req = request, res = response, next) => {
  const token = req.header("x-token");
  console.log(token)

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }
  try {
    const { uid }= jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid)
    if(!usuario){
      return res.status(401).json({
        msg: "token no valido - usuario no existente en BD",
      });
    }


    //verificar si el uid esta en esta true
    if(!usuario.estado){
      return res.status(401).json({
        msg: 'token no valido - usuario con estado false'
      })
    }

    req.uid = Usuario
    
    next()

  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: 'token no valido'
    })
  }
};

module.exports = {
  validarJWT,
};
