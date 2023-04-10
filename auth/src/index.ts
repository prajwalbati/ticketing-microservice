
import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});