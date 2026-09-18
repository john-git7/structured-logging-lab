const createLogger = (serviceName) => {
  const log = (level, msg, extra = {}) => {
    const logEntry = {
      ts: new Date().toISOString(),
      level: level,
      service: serviceName,
      msg: msg,
      ...extra
    };
    console.log(JSON.stringify(logEntry));
  };

  return {
    info: (msg, extra) => log('info', msg, extra),
    warn: (msg, extra) => log('warn', msg, extra),
    error: (msg, extra) => log('error', msg, extra),
    child: (extra) => {
      return {
        info: (msg, extra2) => log('info', msg, { ...extra, ...extra2 }),
        warn: (msg, extra2) => log('warn', msg, { ...extra, ...extra2 }),
        error: (msg, extra2) => log('error', msg, { ...extra, ...extra2 }),
      };
    }
  };
};

const logger = createLogger('orders-api');
module.exports = logger;
