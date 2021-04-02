import createStore from './createStore';
import createProblem from './createProblem';

export const gameStates = Object.freeze({
  intro: 'intro',
  over: 'over',
  error: 'error',
  roundInit: 'round-init', // components hidden
  roundLoading: 'round-loading', // showing components
  roundReady: 'round-ready', // components ready
  roundRunning: 'round-running', // timer started
  roundStopped: 'round-stopped', // timer stopped
  roundSuccess: 'round-success', // animation of result
  roundFail: 'round-fail', // animation of result
  roundOver: 'round-over' // round is over
});

const initialGlobalState = {
  gameState: gameStates.intro,
  initScoreUnit: 10,
  scoreUnitReducer: 0.98,
  rounds: 3,
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
      return { ...state, gameState: gameStates.roundInit };
    case 'restartGame':
      return {
        ...getInitialGlobalState(initialGlobalState),
        gameState: gameStates.roundInit
      };
    case 'stopRound':
      return { ...state, gameState: gameStates.roundStopped };
    case 'checkAnswer':
      console.log(action.payload);
      const { correct } = action.payload;
      return {
        ...state,
        ...(correct && { score: state.score + state.scoreUnit }),
        ...(correct
          ? { gameState: gameStates.roundSuccess }
          : { gameState: gameStates.roundFail })
      };
    case 'initRound':
      return {
        ...state,
        round: state.round + 1,
        gameState: gameStates.roundInit,
        scoreUnit: state.initScoreUnit,
        problemSpec: createProblem(state.problemOptions)
      };

    case 'startRound':
      return { ...state, gameState: gameStates.roundRunning };
    case 'finishRound':
      return {
        ...state,
        gameState: gameStates.roundOver,
        ...(state.round === state.rounds && {
          gameState: gameStates.over
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
    getState().gameState !== gameStates.roundRunning
      ? clearInterval(timer)
      : reduceScoreUnit();
  }, 100);
};
export const stopRound = () => dispatch({ type: 'stopRound' });
export const finishRound = () => dispatch({ type: 'finishRound' });
export const reduceScoreUnit = () => {
  dispatch({ type: 'reduceScoreUnit' });
};
