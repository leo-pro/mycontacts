import { useEffect, useState } from 'react';
import { ToastMessages } from '../../../interfaces/Toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  useEffect(() => {
    function handleAddToast(event: any) {
      const { type, text } = event.detail;

      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
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
