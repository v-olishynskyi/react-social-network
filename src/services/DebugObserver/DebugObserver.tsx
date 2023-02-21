import React from 'react';
import { useRecoilSnapshot } from 'recoil';

const DebugObserver: React.FC = () => {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug('The following atoms were modified:');
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
};

export default DebugObserver;
