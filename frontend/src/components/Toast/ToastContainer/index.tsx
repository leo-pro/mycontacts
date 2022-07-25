import { useEffect, useState } from 'react';
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

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          text={message.text}
          type={message.type}
        />
      ))}
    </Container>
  );
}
