import dotenv from 'dotenv';
dotenv.config();
import express, { response } from 'express';
import cors from 'cors';
console.log("MONGO URL =>", process.env.MONGODB_URL);


import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import myListRouter from './routes/myList.route.js';
import addressRouter from './routes/address.route.js';


const app = express(); 
app.use(cors());
// app.options('*',cors())

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))


app.get("/",(request,response)=>{
    response.json({
        message : "Server Is Running " + process.env.PORT
        
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/myList',myListRouter)
app.use('/api/address',addressRouter);

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is running",process.env.PORT)
    })
}).catch((error)=>{
    console.log("Database connection failed",error)
})
