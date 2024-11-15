import React from 'react';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <Layout>
      <SearchForm />
      <CookieConsent />
    </Layout>
  );
}

export default App;