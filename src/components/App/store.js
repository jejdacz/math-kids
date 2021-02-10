import createStore from './createStore';
import createProblem from './createProblem';

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
  answerPicked: 'answerPicked', // answer picked, disable buttons
  success: 'success', // animation of result
  fail: 'fail', // animation of result
  over: 'over' // round is over
});

const initialGlobalState = {
  gameState: gameStates.intro,
  initScoreUnit: 10,
  scoreUnitReducer: 0.98,
  rounds: 3,
  score: 0,
  scoreUnit: 10,
  round: 1,
  roundState: roundStates.init,
  problemSpec: {},
  problemOptions: { answersCount: 4 }
};

const getInitialGlobalState = init => ({
  ...init,
  problemSpec: createProblem(init.problemOptions)
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'startGame':
      return { ...state, gameState: gameStates.game };
    case 'pickAnswer':
      console.log(action.payload);
      const { correct } = action.payload;
      return {
        ...state,
        ...(correct && { score: state.score + state.scoreUnit }),
        roundState: roundStates.answerPicked
      };
    case 'startRound':
      return { ...state, roundState: roundStates.running };
    case 'finishRound':
      return {
        ...state,
        ...(state.round === state.rounds && { gameState: gameStates.over }),
        ...(state.round !== state.rounds && {
          round: state.round + 1,
          roundState: roundStates.init,
          scoreUnit: state.initScoreUnit,
          problemSpec: createProblem(state.problemOptions)
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
export const pickAnswer = payload => dispatch({ type: 'pickAnswer', payload });
export const startRound = () => {
  dispatch({ type: 'startRound' });
  const timer = setInterval(() => {
    getState().roundState !== roundStates.running
      ? clearInterval(timer)
      : reduceScoreUnit();
  }, 100);
};
export const finishRound = () => dispatch({ type: 'finishRound' });
export const reduceScoreUnit = () => {
  dispatch({ type: 'reduceScoreUnit' });
};
