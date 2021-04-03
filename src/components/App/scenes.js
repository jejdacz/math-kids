import './scenes.scss';

// init property is mandatory

const scenes = {
  init: {
    index: 'init',
    className: 'init',
    next: ['introLoading'],
    duration: 0
  },
  introLoading: {
    index: 'introLoading',
    className: 'intro-loading',
    next: ['introGameStarting'],
    duration: 500
  },
  introGameStarting: {
    index: 'introGameStarting',
    className: 'intro-game-starting',
    next: ['roundLoading'],
    duration: 500
  },
  roundLoading: {
    index: 'roundLoading',
    className: 'round-loading',
    next: ['roundSuccess', 'roundFail'],
    duration: 500
  },
  roundSuccess: {
    index: 'roundSuccess',
    className: 'round-success',
    next: ['roundCleanup'],
    duration: 500
  },
  roundFail: {
    index: 'roundFail',
    className: 'round-fail',
    next: ['roundCleanup'],
    duration: 500
  },
  roundCleanup: {
    index: 'roundCleanup',
    className: 'round-cleanup',
    next: ['roundLoading', 'over'],
    duration: 500
  },
  over: {
    index: 'over',
    className: 'over',
    next: ['overGameRestarting'],
    duration: 500
  },
  overGameRestarting: {
    index: 'overGameRestarting',
    className: 'over-game-restarting',
    next: ['roundLoading'],
    duration: 500
  }
};

export default scenes;
