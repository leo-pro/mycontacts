/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface HeaderProps {
  hasError: boolean,
  quantityOfContacts: number,
  quantityOfFilteredContacts: number
}

export default function Header({ hasError, quantityOfContacts, quantityOfFilteredContacts }: HeaderProps) {
  const alignment = hasError
    ? 'flex-end'
    : (quantityOfContacts > 0
      ? 'space-between'
      : 'center'
    );

  return (
    <Container justifyContent={alignment}>
      {(!hasError && quantityOfContacts > 0) && (
      <strong>
        {quantityOfFilteredContacts}
        {quantityOfFilteredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Container>
  );
}
