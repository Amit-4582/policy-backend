const logger = require("../core-configuration/logger/log-config");

const loggerMiddleware = (req, res, next) => {
  const startTime = process.hrtime(); 
  const { method, originalUrl, ip, headers } = req;

  // Request start log with additional details
  logger.info({
    message: "REQUEST START",
    method,
    path: originalUrl,
    ip,
    userAgent: headers['user-agent'],
    timestamp: new Date().toISOString()
  });

  // Store the original end function
  const originalEnd = res.end;
  const chunks = [];

  // Override the end function to capture response body
  res.end = function (chunk, ...args) {
    if (chunk) chunks.push(Buffer.from(chunk));
    const responseBody = Buffer.concat(chunks).toString('utf8');
    
    // Calculate duration in milliseconds
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    // Request end log with comprehensive details
    logger.info({
      message: "REQUEST END",
      method,
      path: originalUrl,
      status: res.statusCode,
      duration: `${durationMs}ms`,
      responseSize: headers['content-length'] || 'unknown',
      timestamp: new Date().toISOString()
    });

    // Restore original end function
    originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};

module.exports = loggerMiddleware;