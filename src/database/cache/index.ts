import Redis from 'ioredis';

const cacheClient = new Redis(process.env.REDIS_URL);

const getCache = async <T>(cacheKey: string): Promise<T | undefined> => {
  const cacheData = await cacheClient.get(cacheKey);

  if (cacheData) {
    const parsedData = JSON.parse(cacheData);

    return parsedData;
  }

  return undefined;
};

const invalidateCachePrefix = async (prefix: string): Promise<void> => {
  const keys = await cacheClient.keys(prefix);
  const pipeline = cacheClient.pipeline();

  keys.forEach(key => pipeline.del(key));

  await pipeline.exec();
};

export { cacheClient, getCache, invalidateCachePrefix };
