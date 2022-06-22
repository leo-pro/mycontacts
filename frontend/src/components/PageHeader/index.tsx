import { Link } from 'react-router-dom';

import arrow from '../../assets/images/icons/arrow.svg';
import { Container } from './styles';

interface PageHeaderProps{
  title: string;
}

export function PageHeader({ title }:PageHeaderProps) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="" />
        <span>Voltar</span>
      </Link>
      <h1>
        {title}
      </h1>
    </Container>
  );
}
