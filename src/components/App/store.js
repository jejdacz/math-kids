import createStore from './createStore';
import createProblem from './createProblem';

export const appStates = Object.freeze({
  intro: 'intro',
  over: 'over',
  error: 'error',
  roundInit: 'round-init', // components hidden
  roundRunning: 'round-running', // timer started
  roundSuccess: 'round-success', // animation of result
  roundFail: 'round-fail', // animation of result
  roundOver: 'round-over' // round is over
});

const initialGlobalState = {
  appState: appStates.intro,
  initScoreUnit: 10,
  scoreUnitReducer: 0.98,
  rounds: 5,
  score: 0,
  scoreUnit: 10,
  round: 1,
  problemSpec: {},
  problemOptions: { answersCount: 4, limit: 10 }
};

const getInitialGlobalState = init => ({
  ...init,
  problemSpec: createProblem(init.problemOptions)
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'startGame':
      return { ...state, appState: appStates.roundInit };
    case 'restartGame':
      return {
        ...getInitialGlobalState(initialGlobalState),
        appState: appStates.roundInit
      };
    case 'checkAnswer':
      const { correct } = action.payload;
      return {
        ...state,
        ...(correct && { score: state.score + state.scoreUnit }),
        ...(correct
          ? { appState: appStates.roundSuccess }
          : { appState: appStates.roundFail })
      };
    case 'initRound':
      return {
        ...state,
        round: state.round + 1,
        appState: appStates.roundInit,
        scoreUnit: state.initScoreUnit,
        problemSpec: createProblem(state.problemOptions)
      };

    case 'startRound':
      return { ...state, appState: appStates.roundRunning };
    case 'finishRound':
      return {
        ...state,
        appState: appStates.roundOver,
        ...(state.round === state.rounds && {
          appState: appStates.over
        })
      };
    case 'reduceScoreUnit':
      return { ...state, scoreUnit: state.scoreUnit * state.scoreUnitReducer };

    default:
      throw Error('action type not defined');
  }
};

/*** store ***/

export const store = createStore(
  reducer,
  initialGlobalState,
  getInitialGlobalState
);

const { dispatch, getState } = store;

/* actions */

export const startGame = () => dispatch({ type: 'startGame' });
export const restartGame = () => dispatch({ type: 'restartGame' });
export const checkAnswer = payload =>
  dispatch({ type: 'checkAnswer', payload });
export const initRound = () => dispatch({ type: 'initRound' });
export const startRound = () => {
  dispatch({ type: 'startRound' });
  const timer = setInterval(() => {
    getState().appState !== appStates.roundRunning
      ? clearInterval(timer)
      : reduceScoreUnit();
  }, 100);
};
export const finishRound = () => dispatch({ type: 'finishRound' });
export const reduceScoreUnit = () => {
  dispatch({ type: 'reduceScoreUnit' });
};
