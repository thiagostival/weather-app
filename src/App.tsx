import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

// COMPONENTS
import { Home } from './pages/Home';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Home />

      <GlobalStyle />
    </ThemeProvider>
  );
}
