const express = require("express")
const cors = require('cors');
const { dbConnection } = require("../database/config");
require('colors')

class Server {
  constructor() {
    this.app = express()
    this.hostname = "127.0.0.1";
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'

    //conexion a base de datos
   this.conectarDB()


    //middlewares
    this.middlewares()
    //turas de la aplicación
    this.routes()
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares(){
    //cors
    this.app.use(cors())
    //parseo y lectura del body json
    this.app.use(express.json())
    //directorio publico
    this.app.use(express.static('public'))
  }

  routes(){
  this.app.use(this.authPath, require("../routes/auth"));
  this.app.use(this.usuariosPath, require('../routes/userRoutes'))

  }

  listen(){
      this.app.listen(this.port, this.hostname, () => {
    console.log(`El servidor se está ejecutando en http://${this.hostname}:${this.port}/`.cyan)
    })
  }
}

module.exports = Server;
