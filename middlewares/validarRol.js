const {request , response} = require('express')
const Usuario = require("../models/user")

const admRol = async(req = request, res = response, next)=>{
 

   const usuario = await Usuario();
  const { rol, name  } = usuario

   if (!req.usuario) {
     return res.status(500).json({
       msg: "Se quiere verificar el rol sin validar el token",
     });
   } 

  //leer el usuario que corresponde al uid
 
  if (rol !==  'ADMIN_ROL') {
    return res.status(401).json({
      msg: `${name} no es administrador: acceso denegado`
    })
  }


  next()
}
const tieneRol = (...roles)=>{
  /* return (req, res = response, next)=>{
    if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token'
    });
  }
  if(!roles.includes(req.usuario.rol)){
    return res.status(401).json({
      msg: `El servicio require uno de estos roles ${roles}`
    })
  }
    next()
  } */
}


module.exports = {
  admRol,
  tieneRol
}