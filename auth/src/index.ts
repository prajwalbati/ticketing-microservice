import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    console.log("Starting up application");
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        const DBURL = process.env.MONGO_URI;
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