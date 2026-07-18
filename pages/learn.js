import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { extractSigns, cleanSignName } from '../lib/constants';
import quizData from '../quiz_data.json';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Learn Pakistan Traffic Signs",
  "description": "Browse a complete gallery of 100+ Pakistan traffic signs with English and Urdu names. Essential for passing the e-sign test for your driving license.",
  "url": "https://drivetestpk.com/learn"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drivetestpk.com/" },
    { "@type": "ListItem", "position": 2, "name": "Learn Signs", "item": "https://drivetestpk.com/learn" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long after getting a learner permit can I take the regular driving test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Pakistan, you must wait a minimum of 42 days after the issuance of your learner's permit before you are eligible to appear for the permanent driving license test (both the e-sign test and practical track)."
      }
    },
    {
      "@type": "Question",
      "name": "How many traffic signs will I be tested on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During the official computerized e-sign test at DLIMS or other centers, you will typically be presented with 10 to 20 random signs and traffic rules. You must correctly answer the majority of them to pass."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I fail the e-sign test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you fail the computerized sign test, you cannot proceed to the practical driving track. You will be given a waiting period (usually 14 to 42 days depending on your province) before you can re-apply and take the test again."
      }
    },
    {
      "@type": "Question",
      "name": "What do the different shapes of traffic signs mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Warning signs are usually triangular with red borders, mandatory signs are circular, and informational signs are rectangular. Memorizing these shapes is the best way to pass the e-sign test quickly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take the sign test in Urdu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, official driving test centers across Pakistan allow you to choose either English or Urdu before you begin your computerized e-sign test."
      }
    },
    {
      "@type": "Question",
      "name": "Is the e-sign test the same for car and motorcycle licenses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the basic traffic signs, signals, and road safety rules evaluated in the computerized test are the same whether you are applying for a motorcycle (M/Cycle) or motorcar (LTV) license."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to bring my original CNIC for the test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. You must bring your original, valid computerized National Identity Card (CNIC) and your valid original learner's permit on the day of your driving test. Copies are not accepted."
      }
    }
  ]
};

const SeoHead = () => (
  <Head>
    <title>Learn Pakistan Traffic Signs (English &amp; Urdu) | Driving Test Guide</title>
    <meta name="description" content="Browse a complete gallery of 100+ Pakistan traffic signs with English and Urdu names. Essential for passing the e-sign test for your driving license." />
    <link rel="canonical" href="https://drivetestpk.com/learn" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  </Head>
);

const SeoContent = () => (
  <details className="seo-master-accordion">
    <summary className="seo-master-summary">Read FAQs &amp; Guide</summary>
    <div className="seo-content-wrapper">
      <article className="seo-content">
        <h2>Pakistan Traffic Signs Guide (پاکستان ٹریفک نشانات گائیڈ)</h2>
        <p>Welcome to the ultimate guide to mastering road signs for your driving license test. Whether you are preparing for your learner&apos;s permit or permanent license, understanding these symbols is critical for the computerized sign test (e-sign test) and for your safety on the road.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">اپنے ڈرائیونگ لائسنس ٹیسٹ کے لیے سڑک کے نشانات میں مہارت حاصل کرنے کی حتمی گائیڈ میں خوش آمدید۔</span></p>

        <div className="seo-accordion-container">
          <details className="seo-accordion">
            <summary>How long after getting a learner permit can I take the regular driving test? (لرنر پرمٹ کے بعد ڈرائیونگ ٹیسٹ کب دے سکتے ہیں؟)</summary>
            <div className="accordion-content">
              <p>In Pakistan, you must wait a minimum of 42 days after the issuance of your learner&apos;s permit before you are eligible to appear for the permanent driving license test.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">پاکستان میں، آپ کو لرنر پرمٹ جاری ہونے کے بعد کم از کم 42 دن کا انتظار کرنا ہوگا۔</span></p>
            </div>
          </details>

          <details className="seo-accordion">
            <summary>How many traffic signs will I be tested on? (ٹیسٹ میں کتنے ٹریفک نشانات ہوں گے؟)</summary>
            <div className="accordion-content">
              <p>During the official computerized e-sign test at DLIMS or other centers, you will typically be presented with 10 to 20 random signs and traffic rules.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">سرکاری کمپیوٹرائزڈ ای سائن ٹیسٹ کے دوران، آپ کو عام طور پر 10 سے 20 بے ترتیب نشانات دکھائے جائیں گے۔</span></p>
            </div>
          </details>

          <details className="seo-accordion">
            <summary>What happens if I fail the e-sign test? (اگر میں ای سائن ٹیسٹ میں فیل ہو جاؤں تو کیا ہوگا؟)</summary>
            <div className="accordion-content">
              <p>If you fail the computerized sign test, you cannot proceed to the practical driving track. You will be given a waiting period (usually 14 to 42 days depending on your province) before you can re-apply.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">اگر آپ کمپیوٹرائزڈ سائن ٹیسٹ میں فیل ہو جاتے ہیں، تو آپ کو 14 سے 42 دن کا انتظار کرنا ہوگا۔</span></p>
            </div>
          </details>

          <details className="seo-accordion">
            <summary>What do the different shapes of traffic signs mean? (ٹریفک نشانات کی مختلف اشکال کا کیا مطلب ہے؟)</summary>
            <div className="accordion-content">
              <p>Warning signs are usually triangular with red borders, mandatory signs are circular, and informational signs are rectangular.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">انتباہی نشانات تکونی، لازمی نشانات گول، اور معلوماتی نشانات مستطیل ہوتے ہیں۔</span></p>
            </div>
          </details>

          <details className="seo-accordion">
            <summary>Can I take the sign test in Urdu? (کیا میں سائن ٹیسٹ اردو میں دے سکتا ہوں؟)</summary>
            <div className="accordion-content">
              <p>Yes, official driving test centers across Pakistan allow you to choose either English or Urdu before you begin your computerized e-sign test.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">جی ہاں، پاکستان بھر میں سرکاری ڈرائیونگ ٹیسٹ مراکز آپ کو انگریزی یا اردو کا انتخاب کرنے کی اجازت دیتے ہیں۔</span></p>
            </div>
          </details>

          <details className="seo-accordion">
            <summary>Do I need to bring my original CNIC for the test? (کیا مجھے ٹیسٹ کے لیے اصل شناختی کارڈ لانا ہوگا؟)</summary>
            <div className="accordion-content">
              <p>Absolutely. You must bring your original, valid computerized National Identity Card (CNIC) and your valid original learner&apos;s permit on the day of your driving test. Copies are not accepted.<br /><br /><span style={{ fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem' }} dir="rtl">بالکل۔ آپ کو اپنا اصل CNIC اور درست لرنر پرمٹ لانا ہوگا۔ کاپیاں قبول نہیں کی جاتیں۔</span></p>
            </div>
          </details>
        </div>
      </article>
    </div>
  </details>
);

export default function LearnPage({ signs }) {
  const router = useRouter();
  const { language } = useLang();
  const isUrdu = language === 'urdu';

  // No preloading screen — render gallery immediately for fast FCP
  const [view, setView] = useState('gallery'); // gallery | detail
  const [learnIndex, setLearnIndex] = useState(0);

  const openDetail = useCallback((idx) => {
    setLearnIndex(idx);
    setView('detail');
  }, []);

  const handleNextLearn = useCallback(() => setLearnIndex(p => (p + 1) % signs.length), [signs.length]);
  const handlePrevLearn = useCallback(() => setLearnIndex(p => (p - 1 + signs.length) % signs.length), [signs.length]);

  // ── Gallery ──
  if (view === 'gallery') {
    return (
      <>
        <SeoHead />
        <div className="app-container">
          <main id="main-content" className="glass-card quiz-card" style={{ height: '100%', maxHeight: '98vh' }}>
            <div className="quiz-header">
              <div className="header-info" style={{ justifyContent: 'center' }}>
                <span>{isUrdu ? 'اشارے سیکھیں' : 'Learn Signs'} ({signs.length})</span>
              </div>
            </div>
            <div className="gallery-grid" role="list" aria-label={isUrdu ? 'ٹریفک نشانات کی گیلری' : 'Traffic signs gallery'}>
              {signs.map((sign, idx) => (
                <button
                  key={sign.id}
                  className="gallery-item"
                  onClick={() => openDetail(idx)}
                  role="listitem"
                  aria-label={`${isUrdu ? 'سیکھیں' : 'Learn'}: ${cleanSignName(sign.name)}`}
                >
                  <img
                    src={sign.image}
                    alt={cleanSignName(sign.name)}
                    className="gallery-image"
                    loading="lazy"
                    width="80"
                    height="80"
                  />
                </button>
              ))}
            </div>
            <div className="quiz-footer">
              <button
                className="next-btn"
                onClick={() => router.push('/')}
                style={{ marginTop: '1rem' }}
                aria-label={isUrdu ? 'گھر واپس جائیں' : 'Back to home'}
              >
                {isUrdu ? 'واپس' : 'Back'}
              </button>
            </div>
          </main>
          <SeoContent />
        </div>
      </>
    );
  }

  // ── Detail ──
  const sign = signs[learnIndex];
  if (!sign) return null;
  return (
    <>
      <Head>
        <title>{cleanSignName(sign.name)} — Pakistan Traffic Sign</title>
        <meta name="description" content={`Learn about the "${cleanSignName(sign.name)}" traffic sign used in Pakistan driving license test.`} />
        <link rel="canonical" href="https://drivetestpk.com/learn" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <div className="app-container">
        <main id="main-content" className="glass-card quiz-card">
          <div className="quiz-header">
            <div className="header-info" style={{ justifyContent: 'center' }}>
              <span>{isUrdu ? 'اشارہ' : 'Sign'} {learnIndex + 1} / {signs.length}</span>
            </div>
          </div>
          <div className="question-area">
            <div className="main-image-container" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <img
                src={sign.image}
                alt={cleanSignName(sign.name)}
                className="question-image"
                style={{ maxHeight: '300px' }}
                width="300"
                height="300"
              />
            </div>
            <h2 className={`question-text ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
              {cleanSignName(sign.name)}
            </h2>
          </div>
          <div className="quiz-footer" style={{ justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
            <button
              className="next-btn"
              onClick={handlePrevLearn}
              style={{ background: 'rgba(255,255,255,0.1)' }}
              aria-label={isUrdu ? 'پچھلا نشان' : 'Previous sign'}
            >
              {isUrdu ? 'پچھلا' : 'Prev'}
            </button>
            <button
              className="next-btn"
              onClick={() => setView('gallery')}
              style={{ background: 'rgba(239,68,68,0.2)', color: '#fee2e2' }}
              aria-label={isUrdu ? 'گیلری بند کریں' : 'Close detail view'}
            >
              {isUrdu ? 'بند کریں' : 'Close'}
            </button>
            <button
              className="next-btn"
              onClick={handleNextLearn}
              aria-label={isUrdu ? 'اگلا نشان' : 'Next sign'}
            >
              {isUrdu ? 'اگلا' : 'Next'}
            </button>
          </div>
        </main>
        <SeoContent />
      </div>
    </>
  );
}

// SSG — runs at build time, Google sees all sign names
export async function getStaticProps() {
  const signsEn = extractSigns(quizData.english);
  return {
    props: { signs: signsEn },
  };
}
