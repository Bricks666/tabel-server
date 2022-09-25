import { Router } from 'express';
import dataRoute from './data';

const route = Router();

route.use('/data', dataRoute);

export default route;
