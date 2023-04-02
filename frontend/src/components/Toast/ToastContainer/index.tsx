/* eslint-disable max-len */
import { useEffect } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { ToastMessages } from '../../../interfaces/Toast';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem: handleRemoveMessage,
    renderList,
  } = useAnimatedList<ToastMessages>();

  useEffect(() => {
    function handleAddToast({ text, type }:any) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={() => handleRemoveMessage(Number(message.id))}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
