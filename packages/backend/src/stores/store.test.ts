import { createStore } from "./store";

interface MockState {
  a: number;
  b: number;
  c?: number;
}
const mockState = { a: 123, b: 123 };

describe("store", () => {
  test("store partial state", () => {
    const { set, get } = createStore<MockState>(mockState);
    set({ c: 123 });
    expect(get()).toEqual({ ...mockState, c: 123 });
  });

  test("not leak information between stores", () => {
    const store1 = createStore<MockState>(mockState);
    const store2 = createStore<MockState>(mockState);
    store1.set({ c: 123 });
    expect(store2.get()).toEqual(mockState);
  });

  test("subscribe to updates", () => {
    const store = createStore<MockState>(mockState);
    const callback = jest.fn();
    store.subscribe(callback);

    store.set({ a: 123 });
    store.set({ b: 456 });
    
    expect(callback).toBeCalledWith({ a: 123 });
    expect(callback).toHaveBeenLastCalledWith({ b: 456 });
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
