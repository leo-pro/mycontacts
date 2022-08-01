import { ReactNode } from 'react';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { Container, Footer, Overlay } from './styles';

interface ModalProps {
  danger?: boolean
  visible: boolean
  title: string
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function Modal({
  danger,
  visible,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  isLoading,
}:ModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal>
      <Overlay>
        <Container danger={danger}>
          <h1>
            {title}
          </h1>
          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel ?? 'Cancelar'}
            </button>
            <Button type="button" danger onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel ?? 'Confirmar'}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
