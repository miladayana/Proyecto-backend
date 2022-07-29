
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('Base de datos conectadaaaaaa');
    } catch {
    console.log('Error a la hora de iniciar la base de datos')
    }
}
module.exports = {dbConnection}