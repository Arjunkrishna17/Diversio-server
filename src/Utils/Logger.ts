import { createLogger, format, transports } from "winston";

const myFormat = format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message} `;
});

export const Logger = createLogger({
  format: format.combine(format.timestamp(), myFormat),
  level: "debug",
  transports: [new transports.Console()],
});
