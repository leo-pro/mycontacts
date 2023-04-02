import { RefObject, memo, useEffect } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { ToastMessages, ToastType } from '../../../interfaces/Toast';

export interface ToastMessageProps{
  message: ToastMessages
  onRemoveMessage: (id?: number) => void
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
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

  function handleRemoveToast(id?: number) {
    onRemoveMessage(id);
  }

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast(message.id)}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === ToastType.DANGER && <img src={xCircleIcon} alt="danger" />}
      {message.type === ToastType.SUCCESS && <img src={checkCircleIcon} alt="success" />}
      <strong>
        {message.text}
      </strong>
    </Container>
  );
}

export default memo(ToastMessage);
