/* eslint-disable max-len */
import {
  ReactElement,
  RefObject, createRef, useCallback, useEffect, useRef, useState,
} from 'react';

interface RenderItemProps {
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

type Identifier = {
  id?: number
}

export default function useAnimatedList<T extends Identifier>(initialValue = []) {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<Array<number | undefined>>(initialValue);
  const [items, setItems] = useState<T[]>(initialValue);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((itemId?: number) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((message) => message.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const getAnimatedRef = useCallback((itemId?: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem: (message: T, { isLeaving, animatedRef }: RenderItemProps) => ReactElement) => items.map((item) => {
    const isLeaving = pendingRemovalItemsIds.includes(item.id);
    const animatedRef = getAnimatedRef(item.id);

    return renderItem(item, { isLeaving, animatedRef });
  }), [getAnimatedRef, items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
