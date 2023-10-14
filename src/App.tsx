import { identity } from "lodash-es";
import { temporal, TemporalState } from "zundo";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import {
  createWithEqualityFn,
  useStoreWithEqualityFn,
} from "zustand/traditional";

interface MyState {
  bears: number;
  increment: () => void;
  decrement: () => void;
}

const useMyStore = createWithEqualityFn(
  devtools(
    persist(
      temporal<MyState>((set) => ({
        bears: 0,
        increment: () => set((state) => ({ bears: state.bears + 1 })),
        decrement: () => set((state) => ({ bears: state.bears - 1 })),
      })),
      shallow,
    ),
  ),
);

const useTemporalStore = <T extends unknown>(
  selector: (state: TemporalState<MyState>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(useMyStore.temporal, selector, equality);

const App = () => {
  const store = useMyStore();
  const { bears, increment, decrement } = store;
  const { undo, redo, futureStates, pastStates } =
    useTemporalStore<TemporalState<MyState>>(identity);

  return (
    <div>
      <h1>
        <span role="img" aria-label="bear">
          🐻
        </span>
        <span role="img" aria-label="recycle">
          ♻️
        </span>
        Zundo!
      </h1>
      past states: {JSON.stringify(pastStates)}
      <br />
      future states: {JSON.stringify(futureStates)}
      <br />
      current state: {JSON.stringify(store)}
      <br />
      <br />
      bears: {bears}
      <br />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <br />
      <button onClick={() => undo()}>undo</button>
      <button onClick={() => redo()}>redo</button>
    </div>
  );
};

export default App;
