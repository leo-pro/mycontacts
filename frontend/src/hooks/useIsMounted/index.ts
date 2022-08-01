import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMounted = useRef<boolean | undefined | null>(null);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getIsMounted = useCallback(() => isMounted.current, []);

  return getIsMounted;
}
