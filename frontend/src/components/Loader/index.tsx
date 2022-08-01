import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import { Overlay } from './styles';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }:LoaderProps) {
  if (!isLoading) {
    return null;
  }
  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
