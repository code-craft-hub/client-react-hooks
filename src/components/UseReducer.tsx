
// ADVANCED EXAMPLE WITH useReducer.
import { useMemo, useReducer } from "react";

const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";

type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset"; payload: number };

interface State {
  count: number;
}

// Simulate an expensive computation
function computeInitialCount(): number {
  console.log("Computing initial count...");
  let total = 0;
  for (let i = 0; i < 1e7; i++) {
    total += i;
  }
  return total;
}

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return init(action.payload);
    default:
      throw new Error(`Unhandled action type: ${(action as ActionType).type}`);
  }
}

function init(initialCount: number): State {
  return { count: initialCount };
}

const UseReducer = () => {
  const initialCount = useMemo(() => computeInitialCount(),[]);
  const [state, dispatch] = useReducer(reducer, initialCount, (initCount) => ({count: initCount}));

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: RESET, payload: initialCount })}>
        Reset
      </button>
    </>
  );
};

export default UseReducer;

// BASIC EXAMPLE

// import { useReducer } from "react";

// const INCREMENT = "increment";
// const DECREMENT = "decrement";
// const RESET = "reset";

// type ActionType =
//   | { type: "increment" }
//   | { type: "decrement" }
//   | { type: "reset"; payload: number };


// interface State {
//   count: number;
// }

// const UseReducer = () => {
//     console.log("USEREDUCER")
//   function reducer(state: State, action: ActionType) {
//     switch (action.type) {
//       case INCREMENT:
//         return { count: state.count + 1 };
//       case DECREMENT:
//         return { count: state.count - 1 };
//       case RESET:
//         return init(action.payload);
//       default:
//         throw new Error(`Unhandled action type: ${(action as ActionType).type}`);
//     }
//   }

//   function init(initialCount: number) {
//     return { count: initialCount };
//   }

//   const initialCount = 0;
//   const [state, dispatch] = useReducer(reducer, initialCount, init);

//   return (
//     <>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
//       <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
//       <button onClick={() => dispatch({ type: RESET, payload: initialCount })}>
//         Reset
//       </button>
//     </>
//   );
// };

// export default UseReducer;
