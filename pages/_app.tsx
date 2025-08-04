import { AppProps } from 'next/app';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // Extract the current page name from the route
  const path = router.pathname;
  let currentPageName = 'Download';
  
  if (path === '/admin') {
    currentPageName = 'Admin';
  } else if (path === '/analytics') {
    currentPageName = 'Analytics';
  }

  return (
    <Router>
      <Layout currentPageName={currentPageName}>
        <Component {...pageProps} />
      </Layout>
    </Router>
  );
}