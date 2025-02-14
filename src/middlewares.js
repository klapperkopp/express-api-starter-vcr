export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function authenticateApiRequest(req, res, next) {
  try {
    const INTERNAL_API_KEY = process?.env?.INTERNAL_API_KEY || null
    const INTERNAL_API_SECRET = process?.env?.INTERNAL_API_SECRET || null

    let authHeader = req.headers["authorization"]
    let b64 = authHeader.split(" ")[1]
    let [internalApiKey, internalApiSecret] = Buffer.from(b64, "base64").toString().split(":")

    if (authHeader && INTERNAL_API_KEY && INTERNAL_API_SECRET && INTERNAL_API_KEY === internalApiKey && INTERNAL_API_SECRET === internalApiSecret) {
      return next()
    } else {
      return res.sendStatus(401)
    }
  } catch (e) {
    return res.sendStatus(401)
  }
}