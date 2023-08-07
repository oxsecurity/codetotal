import { logger } from "../utils/logger";

export const createStore = <State extends object>(
  initialState: State
): Store<State> => {
  let state: State = initialState;
  let _callback = undefined;

  const set = (newState: Partial<State>) => {
    logger.stores.log(
      `Setting store keys: ${Object.keys(newState).join(", ")}`
    );
    state = { ...state, ...newState };
    _callback && _callback(newState);
  };

  const get = (): State => {
    return state;
  };

  const subscribe = (callback: (state: State) => void) => {
    logger.stores.log(`Subscribed to store`);
    _callback = callback;
  };

  return {
    subscribe,
    get,
    set,
  };
};

export interface Store<State> {
  get(): State;
  set(state: Partial<State>): void;
  subscribe(callback: (state: Partial<State>) => void): void;
}
