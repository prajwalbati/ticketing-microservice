
import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});