export const retry = (callback: RetryCallback, options: RetryOptions): void => {
  let retryCount = 0;

  const execute = () => {
    try {
      callback();
    } catch (err) {
      console.log(`trying again in ${options.interval}ms ...`);
      if (options.retries === -1 || retryCount <= options.retries) {
        retryCount++;
        setTimeout(execute, options.interval);
      }
    }
  };

  execute();
};

interface RetryOptions {
  interval: number;
  retries: number;
}

type RetryCallback = () => void;
