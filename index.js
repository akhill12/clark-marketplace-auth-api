import express from 'express';
import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app= express();
dotenv.config();

//To accept the request body in JSON format, we need to use express.json
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_SITE,
    credentials: true,
}));

//Routes
app.use('/api/role',roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


//response handler
app.use((object,req, res, next) => {

    const statusCode = object.status || 500;
    const message = object.message || "Something went wrong";
    return res.status(statusCode).json({
        success: [200,201,204].some(a=>a === statusCode)? true : false ,
        status : statusCode,
        message: message,
        data: object.data
    });
});


//Db Connection
const connectDB = async() =>
{
    try {
        await mongoose.connect(process.env.MONGO_URL + process.env.MONGO_DATABASE_NAME);
        console.log("Connected to " + process.env.MONGO_DATABASE_NAME);

    }
    catch (error) {
        throw error;
    }
}


app.listen(process.env.port,()=>{
    connectDB();
    console.log("connected to BE")
})