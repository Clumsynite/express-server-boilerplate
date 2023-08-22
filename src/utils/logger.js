const winston = require("winston");

const config = require("../config");
const { getLogObject } = require("../helpers/logHelpers");

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  silly: 5,
};

const LEVELS = Object.keys(levels);

const LOG_LEVEL = config.LOG_LEVEL;

const level = () => (LEVELS.includes(LOG_LEVEL) ? LOG_LEVEL : "http");

// Create the logger instance that has to be exported and used to log messages.
let transports = [
  new winston.transports.Console({
    // handleExceptions: true,
  }),
];

if (config.LOG_TO_FILE === "true") {
  // if local environment, store logs in file system
  transports = [
    ...transports,
    new winston.transports.File({
      filename: "winston_logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "winston_logs/all.log" }),
  ];
}

const LOG_FORMATS = {
  JSON: winston.format.json(),
  PRETTY_PRINT: winston.format.prettyPrint(),
};

const winstonLogger = winston.createLogger({
  level: level(),
  levels,
  format: LOG_FORMATS[config.LOG_FORMAT || "PRETTY_PRINT"] || LOG_FORMATS.PRETTY_PRINT,
  transports,
});

const logger = {
  error: (message, data) => winstonLogger.error(message, getLogObject(data, "error")),
  warn: (message, data) => winstonLogger.warn(message, getLogObject(data, "warn")),
  info: (message, data) => winstonLogger.info(message, getLogObject(data, "info", config.LOG_SENSITIVE_DATA)),
  http: (message, data) => winstonLogger.http(message, getLogObject(data, "http")),
  debug: (message, data) => winstonLogger.debug(message, getLogObject(data, "debug")),
  silly: (message, data) => winstonLogger.silly(message, getLogObject(data, "silly")),
};

module.exports = logger;
