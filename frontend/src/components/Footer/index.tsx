import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Select from '../Select';
import { Container } from './styles';

export function Footer() {
  const { theme, handleToggleTheme } = useContext(ThemeContext);

  const [themeSelected, setThemeSelected] = useState<string>('light');

  useEffect(() => {
    setThemeSelected(theme);
  }, [theme]);

  function handleChangeThemeSelected(value: string) {
    setThemeSelected(value);

    handleToggleTheme(value);
  }

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
      <Select
        style={{ width: '120px', height: '36px' }}
        value={themeSelected}
        onChange={(event) => handleChangeThemeSelected(event.target.value)}
      >
        {/* <option value="system">🖥 System</option> */}
        <option value="dark">🌑 Dark</option>
        <option value="light">☀️ Light</option>
      </Select>
    </Container>
  );
}
