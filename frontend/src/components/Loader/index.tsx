import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from './styles';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }:LoaderProps) {
  const loaderRoot = document.getElementById('loader-root');
  const newElement = document.createElement('div');

  useEffect(() => {
    loaderRoot?.appendChild(newElement);
  });

  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    newElement,
  );
}
