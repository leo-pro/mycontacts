import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export interface ModalProps {
  danger?: boolean
}

export function Modal({ danger }:ModalProps) {
  const modalRoot = document.getElementById('modal-root');
  const newElement = document.createElement('div');

  useEffect(() => {
    modalRoot?.appendChild(newElement);
  });

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do modal</h1>
        <p>body</p>
        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button" danger>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    newElement,
  );
}
