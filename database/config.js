const mongoose = require('mongoose')
require('colors')


const dbConnection = async()=>{

  try {
    
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //TODO: Obsoleto
      //useCreateIndex: true,
      //useFindAndModify:false
    })

    console.log('Base de datos corriendo'.magenta);

  }catch(err){
    console.log(err);
  } 

}
module.exports = {

  dbConnection

}