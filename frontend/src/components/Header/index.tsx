import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Container } from './styles';

import logoLightTheme from '../../assets/images/logo-light.svg';
import logoDarkTheme from '../../assets/images/logo-dark.svg';

export default function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    <Container>
      <img src={theme === 'light' ? logoLightTheme : logoDarkTheme} alt="MyContacts" width="220" />
    </Container>
  );
}
