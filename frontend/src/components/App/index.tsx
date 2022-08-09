import { BrowserRouter } from 'react-router-dom';
import { Container } from './styles';
import Header from '../Header';

import GlobalStyle from '../../assets/styles/global';
import ToastContainer from '../Toast/ToastContainer';
import AppRoutes from '../../Routes';
import { Footer } from '../Footer';
import { ThemeProvider } from '../../contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <ToastContainer />

        <Container>
          <Header />
          <AppRoutes />
          <Footer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
