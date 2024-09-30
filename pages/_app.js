import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import '../services/i18n';
import store from '../stores/store';
import { Provider } from 'react-redux';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter(); 
  const { pathname } = router;

  const authPaths = ['/auth/login', '/auth/forgot-password'];

  const isAuthPath = authPaths.includes(pathname);

  return (
    <Provider store={store}>
      {isAuthPath ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}

export default appWithTranslation(App);
