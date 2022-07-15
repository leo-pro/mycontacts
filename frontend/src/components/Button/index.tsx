import { HTMLProps, ReactNode } from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

interface ButtonProps{
  type: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  disabled?: boolean
  children: ReactNode
  danger?: boolean
  onClick?: () => void
  style?: HTMLProps<HTMLButtonElement>
}

export default function Button({
  type,
  isLoading,
  disabled,
  children,
  danger,
  onClick,
  style,
}:ButtonProps) {
  return (
    <StyledButton
      disabled={disabled || isLoading}
      type={type}
      danger={danger}
      onClick={onClick}
      style={style}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
