import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

type OrientationState  = {
  value : ScreenOrientation.Orientation;
  lock: ScreenOrientation.OrientationLock;
} | undefined

export function useOrientation ()  {
  const [orientation, setOrientation] = useState<OrientationState>(undefined);

  const orientationChanged = (result : ScreenOrientation.OrientationChangeEvent)=> {
    setOrientation({
      value: result.orientationInfo.orientation,
      lock: result.orientationLock
    });
  }

  useEffect(() => {
    const getOrientationData = async () => {
      const current = await ScreenOrientation.getOrientationAsync();
      const lock = await ScreenOrientation.getOrientationLockAsync();

      setOrientation({
        value: current,
        lock
      });
    };

    getOrientationData();

    const orientationChangeSub = ScreenOrientation.addOrientationChangeListener(orientationChanged)

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationChangeSub)
    }

  }, []);

  return {
    orientation,
    setOrientation,
  };
};
