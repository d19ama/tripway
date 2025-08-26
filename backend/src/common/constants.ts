import * as process from 'node:process';

export const JWT_SECRET_KEY: string = `${process.env.JWT_SECRET_KEY}`;
