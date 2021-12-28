require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const noteRouter = require('./routes/note')

const connectDB = async () =>{
    try{
        await mongoose.connect(
            'mongodb+srv://ntvinhgv:3132005@memory-password.lmuuq.mongodb.net/memory-password?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log("MongoDB connected")
    } catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>res.send('Hello world'))
app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

const PORT = process.env.PORT||5000

app.listen(PORT, () => console.log("Server started on port", PORT))