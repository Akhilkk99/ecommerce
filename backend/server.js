import express from "express";
import dotenv from "dotenv"
import dbConnection from "./config/dbConfig.js"
import conncetCloudinary from "./config/cloudinary.js";
import cors from 'cors'
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT 

dbConnection();
conncetCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
