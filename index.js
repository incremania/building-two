require('dotenv').config()
const express = require('express');
const app = express();
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const cors = require('cors')
app.use(express.json())
app.use(cors())

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(fileUpload({ useTempFiles: true })); 

app.use(userRoute)




app.use((req, res) => res.send('invalid route'))

// mongoose.connect(process.env.MONGO_URI, {
//     family: 4
// })


mongoose.connect('mongodb+srv://street-easy:1867ms00226@cluster0.msgcuxv.mongodb.net/building-back?retryWrites=true&w=majority&appName=Cluster0', {
    family: 4
})


const port =  process.env.PORT || 6080
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})