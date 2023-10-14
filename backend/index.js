//import some laberyri
import express from "express"
import { PORT, monogoDBURL} from "./config.js"
import mongoose from "mongoose"
import bookRoutes from "./routes/bookRoute.js"
import cors from 'cors'

const app = express();

//Middleware for passing request body
app.use(express.json())

//middleware for handling CORS POLICY
//option 1: Allow All origins with Default of cors
app.use(cors())


//option 2: Allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['content-Type']
// }))



// send the http request
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('welcome to MERN stack development')
})

//Route for books
app.use('/books', bookRoutes);

//connected to the database
mongoose.connect(monogoDBURL)
.then(()=>{
    console.log('App connected to my database')

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
})
.catch(()=>{
    console.log('App failed to connect to my database')
})