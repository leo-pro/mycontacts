import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { ToastType } from '../../../interfaces/Toast';

interface ToastMessageProps{
  text: string
  type?: ToastType
}

export function ToastMessage({ text, type = ToastType.DEFAULT }:ToastMessageProps) {
  return (
    <Container type={type}>
      {type === ToastType.DANGER && <img src={xCircleIcon} alt="danger" />}
      {type === ToastType.SUCCESS && <img src={checkCircleIcon} alt="success" />}
      <strong>
        {text}
      </strong>
    </Container>
  );
}
