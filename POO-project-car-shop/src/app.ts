import express from 'express';
import carRouter from './Routes/carRouter';
import motorcyclesRouter from './Routes/motorcycleRouter';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcyclesRouter);

export default app;
