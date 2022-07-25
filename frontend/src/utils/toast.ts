import { ToastMessages } from '../interfaces/Toast';
import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export function toast({ type, text, duration }: ToastMessages) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
