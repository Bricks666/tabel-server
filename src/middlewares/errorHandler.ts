import { ErrorRequestHandler } from 'express';

export class ErrorHandler {
	handleError: ErrorRequestHandler = async (error, _req, res, next) => {
		console.log(error.statusMessage);
		res.status(500);
		next();
	};
}

export const errorHandler = new ErrorHandler();
