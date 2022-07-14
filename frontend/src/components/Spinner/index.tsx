import { StyledSpinner } from './styles';

interface SpinnerProps {
  size?: string | number
}

export default function Spinner({ size = 32 }:SpinnerProps) {
  return <StyledSpinner size={size} />;
}
