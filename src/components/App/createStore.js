const createStore = (reducer, initState, initStateFunc) => {
  let state = initStateFunc ? initStateFunc(initState) : initState;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => listeners.filter(l => listener !== l);
  };

  return { subscribe, dispatch, getState };
};

export default createStore;
