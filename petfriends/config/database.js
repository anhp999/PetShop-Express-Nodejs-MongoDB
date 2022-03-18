const mongoose = require('mongoose')
const config = require('config')
const database = config.get('mongoURI')

const connectDB = async () => {
    try{
        await mongoose.connect(database,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 

        console.log('Connected Successfully!')
    } catch(error){
        console.log(error.message)
        process.exit(1)
    }
}
module.exports = connectDB