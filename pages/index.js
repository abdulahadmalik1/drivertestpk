import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { MenuCard, DRIVING_TRACKS } from '../lib/constants';
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
        <meta name="description" content="Free Pakistan driving license test practice — 100+ traffic signs quiz in English &amp; Urdu. L-shape and S-shape track guide, DLIMS Punjab, Sindh &amp; Islamabad portals." />
      </Head>

      <div className="app-container">
        <main id="main-content" className="glass-card splash-card">
          <h1>Traffic Sign Quiz</h1>
          <p className="subtitle">Master road signs with our interactive quiz &amp; learning tool.</p>

          <div
            className="language-toggle"
            role="group"
            aria-label={isMenuUrdu ? 'زبان منتخب کریں' : 'Select language'}
          >
            {[
              { value: 'english', label: 'English' },
              { value: 'urdu', label: 'اردو' },
            ].map(({ value, label }) => (
              <button
                key={value}
                id={`lang-${value}`}
                className={`toggle-btn ${menuLang === value ? 'active' : ''}`}
                onClick={() => setMenuLang(value)}
                aria-pressed={menuLang === value}
                aria-label={value === 'english' ? 'Switch to English' : 'اردو میں تبدیل کریں'}
              >
                {label}
              </button>
            ))}
          </div>

          <nav className="action-menu" aria-label={isMenuUrdu ? 'مین مینو' : 'Main navigation'}>
            <MenuCard
              className="menu-card primary"
              icon="⚡"
              title={isMenuUrdu ? 'کوئز شروع کریں' : 'Start Quiz'}
              subtitle={isMenuUrdu ? 'آسان، درمیانی یا لمبا' : 'Short, Medium, or Long'}
              onClick={() => router.push('/quiz')}
              ariaLabel={isMenuUrdu ? 'ٹریفک سائن کوئز شروع کریں' : 'Start traffic sign quiz'}
            />
            <MenuCard
              icon="📖"
              title={isMenuUrdu ? 'اشارے سیکھیں' : 'Learn Signs'}
              subtitle={isMenuUrdu ? 'تمام ٹریفک اشارے دیکھیں' : 'Browse the full gallery'}
              onClick={() => router.push(`/learn?lang=${menuLang}`)}
              ariaLabel={isMenuUrdu ? 'تمام ٹریفک نشانات سیکھیں' : 'Learn all traffic signs gallery'}
            />
            <MenuCard
              icon="🚗"
              title={isMenuUrdu ? 'ڈرائیونگ ٹریکس' : 'Driving Tracks'}
              subtitle={isMenuUrdu ? 'L-شکل اور S-شکل ٹریکس' : 'L-Shape & S-Shape tests'}
              onClick={() => router.push('/tracks')}
              ariaLabel={isMenuUrdu ? 'ڈرائیونگ ٹریکس دیکھیں' : 'View driving tracks guide'}
            />
            <MenuCard
              icon="🔗"
              title={isMenuUrdu ? 'مفید لنکس' : 'Helpful Links'}
              subtitle={isMenuUrdu ? 'لائسنس، جرمانے اور مزید' : 'License, Fines & more'}
              style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}
              onClick={() => router.push('/links')}
              ariaLabel={isMenuUrdu ? 'مفید لنکس اور DLIMS پورٹلز' : 'Helpful links and DLIMS portals'}
            />
          </nav>
        </main>
      </div>
    </>
  );
}
