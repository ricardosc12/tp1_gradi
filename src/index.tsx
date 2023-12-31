/* @refresh reload */
import './global.css';
import { render } from 'solid-js/web';
import App from './App';
import { Router } from '@solidjs/router';
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';
import { themeConfig } from './theme';
import { StoreProvider } from './App/store';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() =>
  <StoreProvider>
    <Router>
      <HopeProvider config={themeConfig}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </HopeProvider>
    </Router>
  </StoreProvider>
  , root!);
