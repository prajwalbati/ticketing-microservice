import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await natsWrapper.connect('ticketing', 'randomString', 'http://nats-srv:4222');

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

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