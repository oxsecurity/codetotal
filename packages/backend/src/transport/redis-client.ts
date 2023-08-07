import { RedisClientType, createClient } from "redis";
import config from "../config";
import { logger } from "../utils/logger";

let _client: RedisClientType;

export const startRedisClient = async (): Promise<void> => {
  try {
    _client = createClient({
      url: config.MEGALINTER_REDIS_URL,
    });
    await _client.connect();
    logger.transport.log("Redis client created");
    return;
  } catch (err) {
    logger.transport.error("Unable to create a Redis client", err);
    throw err;
  }
};

export const subscribeToRedis = async (
  channel: string,
  callback: (msg: string) => void
) => {
  await _client.subscribe(channel, callback);
  logger.transport.log(`Redis subscribed to channel: "${channel}"`);
};
