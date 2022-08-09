import { Container } from './styles';

export function Footer() {
  return (
    <Container>
      <span>
        Made by
        {' '}
        <a
          href="https://devleo.com.br"
          title="Link to devleo's page"
          target="_blank"
          rel="noreferrer"
        >
          DevLeo_
        </a>
      </span>
    </Container>
  );
}
