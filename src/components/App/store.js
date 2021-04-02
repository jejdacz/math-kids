import createStore from './createStore';
import createProblem from './createProblem';

// TODO: only one state list
// Intro
// RoundInit
// RoundLoading
// RoundReady
// ...
// Over
// Error

export const gameStates = Object.freeze({
  intro: 'intro',
  game: 'game',
  over: 'over',
  error: 'error'
});

export const roundStates = Object.freeze({
  init: 'init', // components hidden
  loading: 'loading', // showing components
  ready: 'ready', // components ready
  running: 'running', // timer started
  stopped: 'stopped', // timer stopped
  success: 'success', // animation of result
  fail: 'fail', // animation of result
  over: 'over' // round is over
});

const initialGlobalState = {
  gameState: gameStates.intro,
  initScoreUnit: 10,
  scoreUnitReducer: 0.98,
  rounds: 10,
  score: 0,
  scoreUnit: 10,
  round: 1,
  roundState: roundStates.init,
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
      return { ...state, gameState: gameStates.game };
    case 'restartGame':
      return {
        ...getInitialGlobalState(initialGlobalState),
        gameState: gameStates.game
      };
    case 'stopRound':
      return { ...state, roundState: roundStates.stopped };
    case 'checkAnswer':
      console.log(action.payload);
      const { correct } = action.payload;
      return {
        ...state,
        ...(correct && { score: state.score + state.scoreUnit }),
        ...(correct
          ? { roundState: roundStates.success }
          : { roundState: roundStates.fail })
      };
    case 'initRound':
      return {
        ...state,
        round: state.round + 1,
        roundState: roundStates.init,
        scoreUnit: state.initScoreUnit,
        problemSpec: createProblem(state.problemOptions)
      };

    case 'startRound':
      return { ...state, roundState: roundStates.running };
    case 'finishRound':
      return {
        ...state,
        roundState: roundStates.over,
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
    getState().roundState !== roundStates.running
      ? clearInterval(timer)
      : reduceScoreUnit();
  }, 100);
};
export const stopRound = () => dispatch({ type: 'stopRound' });
export const finishRound = () => dispatch({ type: 'finishRound' });
export const reduceScoreUnit = () => {
  dispatch({ type: 'reduceScoreUnit' });
};
