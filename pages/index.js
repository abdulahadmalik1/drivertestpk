import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { MenuCard } from '../lib/constants';

import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { menuLang, setMenuLang } = useLang();
  const isMenuUrdu = menuLang === 'urdu';

  useEffect(() => {
    // Prefetch routes for instant button clicks
    router.prefetch('/quiz');
    router.prefetch('/learn');
    router.prefetch('/tracks');
    router.prefetch('/links');
  }, [router]);

  return (
    <>
      <Head>
        <title>Pakistan Driving License Test — Free Traffic Signs Quiz</title>
        <meta name="description" content="Free Pakistan driving license test practice — 100+ traffic signs quiz in English & Urdu. L-shape and S-shape track guide, DLIMS Punjab, Sindh & Islamabad portals." />
      </Head>

      <div className="app-container">
        <div className="glass-card splash-card">
          <h1>Traffic Sign Quiz</h1>
          <p className="subtitle">Master road signs with our interactive quiz &amp; learning tool.</p>

          <div className="language-toggle">
            {['english', 'urdu'].map(l => (
              <button
                key={l}
                className={`toggle-btn ${menuLang === l ? 'active' : ''}`}
                onClick={() => setMenuLang(l)}
              >
                {l === 'english' ? 'English' : 'اردو'}
              </button>
            ))}
          </div>

          <div className="action-menu">
            <MenuCard
              className="menu-card primary"
              icon="⚡"
              title={isMenuUrdu ? 'کوئز شروع کریں' : 'Start Quiz'}
              subtitle={isMenuUrdu ? 'آسان، درمیانی یا لمبا' : 'Short, Medium, or Long'}
              onClick={() => router.push('/quiz')}
            />
            <MenuCard
              icon="📖"
              title={isMenuUrdu ? 'اشارے سیکھیں' : 'Learn Signs'}
              subtitle={isMenuUrdu ? 'تمام ٹریفک اشارے دیکھیں' : 'Browse the full gallery'}
              onClick={() => router.push(`/learn?lang=${menuLang}`)}
            />
            <MenuCard
              icon="🚗"
              title={isMenuUrdu ? 'ڈرائیونگ ٹریکس' : 'Driving Tracks'}
              subtitle={isMenuUrdu ? 'L-شکل اور S-شکل ٹریکس' : 'L-Shape & S-Shape tests'}
              onClick={() => router.push('/tracks')}
            />
            <MenuCard
              icon="🔗"
              title={isMenuUrdu ? 'مفید لنکس' : 'Helpful Links'}
              subtitle={isMenuUrdu ? 'لائسنس، جرمانے اور مزید' : 'License, Fines & more'}
              style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}
              onClick={() => router.push('/links')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
