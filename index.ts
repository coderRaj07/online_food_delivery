import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { VandorRoute, AdminRoute } from './routes';
import { MONGO_URI } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/vandor', VandorRoute);
app.use('/admin', AdminRoute);

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to database');
}).catch((err) => { console.log(err) });

app.listen(8000, () => {
  console.log('Server is running on port 8000');
})