import { ToastMessages } from '../interfaces/Toast';

export function toast({ type, text }: ToastMessages) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
