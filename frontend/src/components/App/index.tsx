import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Container } from './styles';
import Header from '../Header';

import GlobalStyle from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import ToastContainer from '../Toast/ToastContainer';
import AppRoutes from '../../Routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />

        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
