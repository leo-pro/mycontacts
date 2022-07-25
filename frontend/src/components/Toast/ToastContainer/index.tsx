import { useCallback, useEffect, useState } from 'react';
import { ToastMessages } from '../../../interfaces/Toast';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  useEffect(() => {
    function handleAddToast({ text, type }:any) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id?: string | number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={() => handleRemoveMessage(message.id)}
        />
      ))}
    </Container>
  );
}
