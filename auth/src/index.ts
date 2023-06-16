import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        const DBURL = 'mongodb://auth-mongo-srv:27017/ticketing-auth';
        await mongoose.connect(DBURL);
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!!!`);
    });
};

start();