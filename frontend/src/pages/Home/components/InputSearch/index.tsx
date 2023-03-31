import { ChangeEventHandler } from 'react';
import { Container } from './styles';

interface InputSearchProps {
  searchTerm: string,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputSearch({ searchTerm, onChange }:InputSearchProps) {
  return (
    <Container>
      <input value={searchTerm} onChange={onChange} type="text" placeholder="Pesquisar contato..." />
    </Container>
  );
}
