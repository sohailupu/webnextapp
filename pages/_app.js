import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import '../services/i18n';
import store from '../stores/store';
import { Provider } from 'react-redux';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(App);
