import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ReactPortalProps {
  containerId?: string
  children: ReactNode
}

export default function ReactPortal({ containerId, children }:ReactPortalProps) {
  const RANDOM_CONTAINER_NAME = `${Math.random().toString(36).substring(2, 7)}-root`;

  let container = document.getElementById(containerId ?? RANDOM_CONTAINER_NAME);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId ?? RANDOM_CONTAINER_NAME);
    document.body.appendChild(container);
  }

  return (ReactDOM.createPortal(children, container));
}
