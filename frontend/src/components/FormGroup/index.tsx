import { ReactNode } from 'react';
import { Container } from './styles';

interface FormGroupProps{
  children: ReactNode
}

export function FormGroup({ children }: FormGroupProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
