import * as redis from "redis";
import config from "../config.json";
import { startRedisClient, subscribeToRedis } from "./redis-client";

const mRedisClient = {
  connect: jest.fn().mockImplementation(),
  subscribe: jest.fn().mockImplementation(),
};

const createClientSpy = jest
  .spyOn(redis, "createClient")
  .mockReturnValue(mRedisClient as unknown as redis.RedisClientType);

describe("redis-client", () => {
  test("startRedisClient", async () => {
    await startRedisClient();
    expect(createClientSpy).toBeCalledWith({ url: config.redisURL });
    expect(mRedisClient.connect).toBeCalled();
  });

  test("createRedisClient should fail gracefully", async () => {
    createClientSpy.mockImplementation(() => {
      throw new Error("error");
    });
    try {
      await startRedisClient();
    } catch (err) {
      expect(err.message).toBe("error");
    }
  });

  test("subscribeToRedis", async () => {
    const callback = noop;
    await subscribeToRedis("channel-123", callback);
    expect(mRedisClient.subscribe).toBeCalledWith("channel-123", callback);
  });
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
