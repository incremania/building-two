require('dotenv').config()
const express = require('express');
const app = express();
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use(userRoute)


app.use((req, res) => res.send('invalid route'))

// mongoose.connect(process.env.MONGO_URI, {
//     family: 4
// })


mongoose.connect('mongodb+srv://street-easy:1867ms00226@cluster0.msgcuxv.mongodb.net/building-back?retryWrites=true&w=majority&appName=Cluster0', {
    family: 4
})


const port = 6080 || process.env.PORT
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})