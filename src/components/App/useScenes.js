import { useState } from 'react';

// scene is action (transition) between states
// scheme is JS object

const useScenes = scheme => {
  const [current, setCurrent] = useState(scheme.init);

  const playScene = cb => setTimeout(cb, current.duration);

  const setScene = scene => {
    if (!current.next.includes(scene.index)) {
      throw Error(`scene ${scene} isn't in current.next list`);
    }

    if (!scheme[scene.index] || scheme[scene.index] !== scene) {
      throw Error(`scene ${scene} isn't in scheme`);
    }

    setCurrent(scheme[scene.index]);
  };

  return [current, setScene, playScene];
};

export default useScenes;
