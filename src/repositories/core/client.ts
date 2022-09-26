import {
	DATABASE,
	DB_HOST,
	DB_PASSWORD,
	DB_PORT,
	DB_USER,
} from '@/consts/repository';
import { Client } from 'pg';

export const client = new Client({
	database: DATABASE,
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
	/* connectionString: `CREATE DATABASE IF NOT EXISTS ${DATABASE};`, */
});
