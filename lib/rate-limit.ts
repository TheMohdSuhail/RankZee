interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipMap.forEach((record, ip) => {
      if (now > record.resetTime) {
        ipMap.delete(ip);
      }
    });
  }, 60000);
}

/**
 * Basic server-side sliding-window rate limiter
 * @param ip Client IP
 * @param limit Maximum allowed requests in window
 * @param windowMs Window in milliseconds (e.g. 60,000 for 1 min)
 */
export function checkRateLimit(
  ip: string = "unknown",
  limit: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetTime) {
    ipMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

