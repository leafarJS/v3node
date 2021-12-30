
const  { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  }, 
  email: {
    type: String,
    required: [true, 'El correo es obligatorio']
  }, 
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true, 
    emun: ['ADMIN_ROL', 'USER_ROL']
  },
  estado: {
    type: Boolean, 
    default: true
  }, 
  google: {
    type: Boolean,
    default: false
  }
})
UsuarioSchema.methods.toJSON = function () {
  const {_id, __v, password, ...user} = this.toObject()
  user.uid = _id 
  return user
}



module.exports = model('Usuario', UsuarioSchema)