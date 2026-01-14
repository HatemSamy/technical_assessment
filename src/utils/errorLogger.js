const isDevelopment = process.env.NODE_ENV !== 'production';

export function logError(err, req = null) {
    const timestamp = new Date().toISOString();
    const isOperational = err.isOperational || false;
    const severity = isOperational ? 'ERROR' : 'CRITICAL';

    const logData = {
        timestamp,
        severity,
        name: err.name || 'Error',
        message: err.message,
        status: err.status || 500,
        isOperational,
    };

    if (req) {
        logData.request = {
            method: req.method,
            url: req.originalUrl || req.url,
            ip: req.ip,
            userAgent: req.get('user-agent'),
            userId: req.user?.id || null,
        };
    }

    if (isDevelopment && err.stack) {
        logData.stack = err.stack;
    }

    if (isOperational) {
        console.error(`[${severity}]`, JSON.stringify(logData, null, 2));
    } else {
        console.error(`[${severity}] PROGRAMMING ERROR - REQUIRES IMMEDIATE ATTENTION!`);
        console.error(JSON.stringify(logData, null, 2));
    }
}

export function logInfo(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}]`, message, data);
}

export function logWarning(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARNING] [${timestamp}]`, message, data);
}
