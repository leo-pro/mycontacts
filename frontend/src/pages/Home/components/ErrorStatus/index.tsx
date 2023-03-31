import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

interface ErrorStatusProps {
  onTryAgain: () => void
}

export default function ErrorStatus({ onTryAgain }:ErrorStatusProps) {
  return (
    <Container>
      <img src={sad} alt="error" />
      <div className="details">
        <span>Ocorreu um erro ao obter os seus contatos!</span>
        <Button type="button" onClick={() => onTryAgain()}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
