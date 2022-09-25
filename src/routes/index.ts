import { Router } from 'express';
import {dataRoute} from './data';

export const appRoute = Router();

appRoute.use('/data', dataRoute);
