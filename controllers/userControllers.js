const  { response, request } = require('express')
const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')



//TODO: Tercero
const userGet = async (req = request , res = response) => {

  //const {q, nombre = 'no name', apikey, page = 10, limit = 12}  = req.query
  const { limite = 4, desde = 0} = req.query
  const query = {estado: true}

  
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total, 
    usuarios 
    
  })
}

//TODO: Segundo
const userPut = async (req = request, res = response) => {
  const  id  = req.params.id;

  const {_id, password, google, correo, ...rest } = req.body

  //Validar contra la base de datos
    if (password) {
      //encriptar la contraseña
      const salt = bcryptjs.genSaltSync()
      rest.password = bcryptjs.hashSync(password, salt)
    }

  req.body.password = "";
  delete req.body.password;

  const user = await Usuario.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`));

  res.status(200).json({ success: true, data: user });
};

//TODO: Primero
const userPost = async (req = request, res = response) => {

  //const { nombre, edad }= req.body
  const { name, email, password, rol } = req.body;
  const usuario = new Usuario({ name, email, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync( password, salt)


  //guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

//TODO: Cuarto
const userDelete = async (req, res = response) => {
  try {
    //BORRAR TOTALMENTE DE LA BASE DE DATOS
    /* const usuario = await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json(usuario) */
    //TODO: 1 const uid = req.uid
   
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, {estado:false})
    //TODO: 2 const usuarioAuth = req.usuario;
    //TODO: 1 res.status(200).json({ usuario, uid });
    //TODO: 2 res.status(200).json({ usuario, usuarioAuth });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      success: true,
      data: {},
      
    });
  }
}

const userPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}