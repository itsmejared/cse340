import winston from "winston";

const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length
      ? ` ${JSON.stringify(meta)}`
      : "";

    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  },
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
