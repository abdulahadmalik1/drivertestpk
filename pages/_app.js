import '../styles/globals.css';
import '../styles/App.css';
import { createContext, useContext, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

// ── Shared language context ──────────────────────────────────────────────────
export const LangContext = createContext({
  menuLang: 'english',
  setMenuLang: () => { },
  language: 'english',
  setLanguage: () => { },
});

export function useLang() {
  return useContext(LangContext);
}

export default function App({ Component, pageProps }) {
  const [menuLang, setMenuLang] = useState('english');
  const [language, setLanguage] = useState('english');

  return (
    <LangContext.Provider value={{ menuLang, setMenuLang, language, setLanguage }}>
      <Component {...pageProps} />
      <Analytics />
    </LangContext.Provider>
  );
}
