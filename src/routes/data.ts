import { Router } from 'express';
import { dataController } from '../controllers/data/data';

export const dataRoute = Router();

dataRoute.get('/', dataController.getData);
dataRoute.post('/', dataController.createData);
dataRoute.put('/:id', dataController.updateData);
dataRoute.delete('/:id', dataController.deleteData);
