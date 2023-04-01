import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import { Overlay } from './styles';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }:LoaderProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
