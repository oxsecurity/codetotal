import config from "../config.json";
import { parseMessage } from "../megalinter/parsers/parser";
import { ReportStore } from "../stores/be-report-store";
import { subscribeToRedis } from "../transport/redis-client";
import { logger } from "../utils/logger";

export const subscribeToMegaLinter = async (
  requestId: string,
  store: ReportStore
) => {
  try {
    const channelId = config.redisChannel.replace("<request-id>", requestId);
    await subscribeToRedis(channelId, (message: string) => {
      parseMessage(JSON.parse(message), store);
    });
  } catch (err) {
    logger.actions.error("Unable to subscribe to Redis");
    throw err;
  }
};
