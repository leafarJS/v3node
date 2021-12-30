const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user')
const { generarJWT } = require('../helpers/generarJWT')

const login = async(req, res = response)=>{

  const { email, password } = req.body
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }
    //verificar si el usuario esta activo
    
    //verificar la contraseña
    const validPassword = await bcryptjs.compareSync(
      password,
      usuario.password
    );
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    //generar el jwt 
    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    });






  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: 'Contactese con el administrador'
    })
  }



  
}

module.exports = {
  login
}