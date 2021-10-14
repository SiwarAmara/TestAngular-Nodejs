const mongoose = require("mongoose")
const express = require("express")
const ShortUrl = require('./models/shortUrl')
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config({path:'./routes/.env'});

// DB Connection
app.listen(process.env.PORT||5000);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED")
}).catch((error) => {
  console.error(error);
   console.log("UNABLE to connect to DB") 
    
})

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Import the routes
const userRoutes = require("./routes/user")
const urlRoutes = require("./routes/url")
//Using routes
app.use('/api', userRoutes) 
app.use('/api', urlRoutes) 

const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`)
})

app.set('view engine','ejs') 
app.use(express.urlencoded({ extended: false }))

