import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

interface SearchNotFoundProps {
  searchTerm: string
}

export default function SearchNotFound({ searchTerm }:SearchNotFoundProps) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="magnifier question" />

      <p>
        Nenhum resultado encontrado para
        {' '}
        <strong>
          "
          {searchTerm}
          "
        </strong>
      </p>
    </Container>
  );
}
