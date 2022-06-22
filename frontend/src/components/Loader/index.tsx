import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from './styles';

export function Loader() {
  const loaderRoot = document.getElementById('loader-root');
  const newElement = document.createElement('div');

  useEffect(() => {
    loaderRoot?.appendChild(newElement);
  });

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    newElement,
  );
}
