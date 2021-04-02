// define transitions

// SCENES (transitions between states) animation is transition!
// intro-loading - objects appears
// intro-game-starting - button push effect, heading shake effect

// CAST
export const cast = {
  'intro-loading': {
    scene: 'intro-loading',
    heading: 'heading',
    'start-button': 'start-button'
  },
  'intro-game-starting': {
    scene: 'intro-game-starting',
    heading: 'heading',
    'start-button': 'start-button'
  }
};
// change scene globaly in Animate component
// class is assigned if id is included in scene ids

export const scenes = {
  introLoading: {
    name: 'intro-loading',
    duration: 1000
  },
  introGameStarting: {
    name: 'intro-game-starting',
    duration: 500
  }
};
/*
// use memo, callback
export const changeScene = (callback, scheme) => {
  // compute scene

  callback(scene);
};*/
/*
// scheme
const scheme = {
  gameState: {
    intro: scenes.introLoading,
    game: {
      roundState: {
        init: scenes.roundInit,
        loading: scenes.roundLoading
      }
    }
  }
};
*/
