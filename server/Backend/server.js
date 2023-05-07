import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DatabaseConnect/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import holidayRoutes from './routes/holidayRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cors from 'cors'
import multer from 'multer'




const storage= multer.diskStorage({})

let upload = multer({ storage })

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

var whitelist = ['http://localhost:3000', 'http://localhost:3000/dashboard', 'http://127.0.0.1:3000', 'https://hms24.netlify.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))


connectDB()



app.get('/', (req, res) => {
    res.json('API server running')
})



// app.use('/api/template',upload.single("image"), productRoutes)
app.use('/api/user', userRoutes)
// app.use('/api/employee', employeeRoutes)

app.use('/api/holiday', holidayRoutes)



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

// mongoose.connection.on('open', function (ref) {
  
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )

 
// })

