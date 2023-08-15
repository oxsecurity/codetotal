import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T) => {
  const previousRef = useRef<T>(value);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
};
