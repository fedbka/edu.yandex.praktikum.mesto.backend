import expressWinston from 'express-winston';
import winston from 'winston';

const transports = {
  console: new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),
    level: 'error',
  }),
  errorLogfile: new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  }),
  requestLogFile: new winston.transports.File({
    filename: 'request.log',
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  }),
};

export const errorLogger = expressWinston.errorLogger({
  transports: [transports.errorLogfile, transports.console],
});

export const requestLogger = expressWinston.logger({
  transports: [transports.requestLogFile],
});
