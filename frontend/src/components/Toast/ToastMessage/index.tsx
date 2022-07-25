import { useEffect } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { ToastMessages, ToastType } from '../../../interfaces/Toast';

interface ToastMessageProps{
  message: ToastMessages
  onRemoveMessage: (id?: string | number) => void
}

export function ToastMessage({
  message,
  onRemoveMessage,
}:ToastMessageProps) {
  const DEFAULT_TIME_TO_REMOVE_TOAST = 7000; // in milliseconds

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || DEFAULT_TIME_TO_REMOVE_TOAST);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast(id?: string | number) {
    onRemoveMessage(id);
  }

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast(message.id)}
      tabIndex={0}
      role="button"
    >
      {message.type === ToastType.DANGER && <img src={xCircleIcon} alt="danger" />}
      {message.type === ToastType.SUCCESS && <img src={checkCircleIcon} alt="success" />}
      <strong>
        {message.text}
      </strong>
    </Container>
  );
}
