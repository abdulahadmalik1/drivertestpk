import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
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

const seoHead = (
  <Head>
    <title>Learn Pakistan Traffic Signs (English & Urdu) | Driving Test Guide</title>
    <meta name="description" content="Browse a complete gallery of 100+ Pakistan traffic signs with English and Urdu names. Essential for passing the e-sign test for your driving license." />
    <link rel="canonical" href="https://drivetestpk.com/learn" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  </Head>
);

const seoContent = (
  <details className="seo-master-accordion">
    <summary className="seo-master-summary">Read FAQs & Guide</summary>
    <div className="seo-content-wrapper">
    <article className="seo-content">
      <h1>Pakistan Traffic Signs Guide (پاکستان ٹریفک نشانات گائیڈ)</h1>
      <p>Welcome to the ultimate guide to mastering road signs for your driving license test. Whether you are preparing for your learner's permit or permanent license, understanding these symbols is critical for the computerized sign test (e-sign test) and for your safety on the road.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">اپنے ڈرائیونگ لائسنس ٹیسٹ کے لیے سڑک کے نشانات میں مہارت حاصل کرنے کی حتمی گائیڈ میں خوش آمدید۔ چاہے آپ اپنے لرنر پرمٹ کی تیاری کر رہے ہوں یا مستقل لائسنس کی، ان علامات کو سمجھنا کمپیوٹرائزڈ سائن ٹیسٹ اور سڑک پر آپ کی حفاظت کے لیے انتہائی ضروری ہے۔</span></p>

      <div className="seo-accordion-container">
        <details className="seo-accordion">
          <summary>How long after getting a learner permit can I take the regular driving test? (لرنر پرمٹ کے بعد ڈرائیونگ ٹیسٹ کب دے سکتے ہیں؟)</summary>
          <div className="accordion-content">
             <p>In Pakistan, you must wait a minimum of 42 days after the issuance of your learner's permit before you are eligible to appear for the permanent driving license test.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">پاکستان میں، آپ کو لرنر پرمٹ جاری ہونے کے بعد کم از کم 42 دن کا انتظار کرنا ہوگا اس سے پہلے کہ آپ مستقل ڈرائیونگ لائسنس ٹیسٹ کے لیے اہل ہوں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>How many traffic signs will I be tested on? (ٹیسٹ میں کتنے ٹریفک نشانات ہوں گے؟)</summary>
          <div className="accordion-content">
            <p>During the official computerized e-sign test at DLIMS or other centers, you will typically be presented with 10 to 20 random signs and traffic rules. You must correctly answer the majority of them to pass.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">سرکاری کمپیوٹرائزڈ ای سائن ٹیسٹ کے دوران، آپ کو عام طور پر 10 سے 20 بے ترتیب نشانات دکھائے جائیں گے۔ پاس ہونے کے لیے آپ کو ان میں سے زیادہ تر کے درست جواب دینے ہوں گے۔</span></p>
          </div>
        </details>
        
        <details className="seo-accordion">
          <summary>What happens if I fail the e-sign test? (اگر میں ای سائن ٹیسٹ میں فیل ہو جاؤں تو کیا ہوگا؟)</summary>
          <div className="accordion-content">
            <p>If you fail the computerized sign test, you cannot proceed to the practical driving track. You will be given a waiting period (usually 14 to 42 days depending on your province) before you can re-apply.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">اگر آپ کمپیوٹرائزڈ سائن ٹیسٹ میں فیل ہو جاتے ہیں، تو آپ پریکٹیکل ڈرائیونگ ٹریک پر نہیں جا سکتے۔ آپ کو دوبارہ اپلائی کرنے سے پہلے 14 سے 42 دن کا انتظار کرنا ہوگا۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>What do the different shapes of traffic signs mean? (ٹریفک نشانات کی مختلف اشکال کا کیا مطلب ہے؟)</summary>
          <div className="accordion-content">
            <p>Warning signs are usually triangular with red borders, mandatory signs are circular, and informational signs are rectangular.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">انتباہی نشانات عام طور پر سرخ سرحدوں کے ساتھ تکونی ہوتے ہیں، لازمی نشانات گول ہوتے ہیں، اور معلوماتی نشانات مستطیل ہوتے ہیں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>Can I take the sign test in Urdu? (کیا میں سائن ٹیسٹ اردو میں دے سکتا ہوں؟)</summary>
          <div className="accordion-content">
            <p>Yes, official driving test centers across Pakistan allow you to choose either English or Urdu before you begin your computerized e-sign test.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">جی ہاں، پاکستان بھر میں سرکاری ڈرائیونگ ٹیسٹ مراکز آپ کو اپنا ٹیسٹ شروع کرنے سے پہلے انگریزی یا اردو کا انتخاب کرنے کی اجازت دیتے ہیں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>Do I need to bring my original CNIC for the test? (کیا مجھے ٹیسٹ کے لیے اصل شناختی کارڈ لانا ہوگا؟)</summary>
          <div className="accordion-content">
            <p>Absolutely. You must bring your original, valid computerized National Identity Card (CNIC) and your valid original learner's permit on the day of your driving test. Copies are not accepted.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">بالکل۔ آپ کو اپنے ڈرائیونگ ٹیسٹ کے دن اپنا اصل، درست کمپیوٹرائزڈ قومی شناختی کارڈ (CNIC) اور اپنا درست اصل لرنر پرمٹ لانا ہوگا۔ کاپیاں قبول نہیں کی جاتیں۔</span></p>
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

    const [view, setView] = useState('preloading'); // preloading | gallery | detail
    const [learnIndex, setLearnIndex] = useState(0);
    const [loadProgress, setLoadProgress] = useState({ done: 0, total: signs.length });

    // Preload ALL sign images on mount before showing gallery
    useEffect(() => {
        let done = 0;
        const total = signs.length;
        setLoadProgress({ done: 0, total });

        Promise.all(signs.map(sign => new Promise(resolve => {
            const img = new window.Image();
            img.onload = img.onerror = () => {
                setLoadProgress({ done: ++done, total });
                resolve();
            };
            img.src = sign.image;
        }))).then(() => {
            setView('gallery');
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openDetail = useCallback((idx) => {
        setLearnIndex(idx);
        setView('detail');
    }, []);

    const handleNextLearn = useCallback(() => setLearnIndex(p => (p + 1) % signs.length), [signs.length]);
    const handlePrevLearn = useCallback(() => setLearnIndex(p => (p - 1 + signs.length) % signs.length), [signs.length]);

    // ── Preloading Screen ──
    if (view === 'preloading') {
        const pct = loadProgress.total > 0 ? Math.round((loadProgress.done / loadProgress.total) * 100) : 0;
        return (
            <>
                {seoHead}
                <div className="app-container">
                    <div className="glass-card splash-card" style={{ gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            border: '3px solid rgba(255,255,255,0.08)',
                            borderTop: '3px solid var(--primary-color)',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        <div style={{ width: '180px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', height: '3px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', width: `${pct}%`,
                                background: 'var(--primary-color)',
                                borderRadius: '999px',
                                transition: 'width 0.2s ease',
                            }} />
                        </div>
                    </div>
                    {seoContent}
                </div>
            </>
        );
    }

    // ── Gallery ──
    if (view === 'gallery') {
        return (
            <>
                {seoHead}
                <div className="app-container">
                    <div className="glass-card quiz-card" style={{ height: '100%', maxHeight: '98vh' }}>
                        <div className="quiz-header">
                            <div className="header-info" style={{ justifyContent: 'center' }}>
                                <span>{isUrdu ? 'اشارے سیکھیں' : 'Learn Signs'} ({signs.length})</span>
                            </div>
                        </div>
                        <div className="gallery-grid">
                            {signs.map((sign, idx) => (
                                <div key={sign.id} className="gallery-item" onClick={() => openDetail(idx)}>
                                    <img src={sign.image} alt={sign.name} className="gallery-image" />
                                </div>
                            ))}
                        </div>
                        <div className="quiz-footer">
                            <button className="next-btn" onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>
                                {isUrdu ? 'واپس' : 'Back'}
                            </button>
                        </div>
                    </div>
                    {seoContent}
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
                <div className="glass-card quiz-card">
                    <div className="quiz-header">
                        <div className="header-info" style={{ justifyContent: 'center' }}>
                            <span>{isUrdu ? 'اشارہ' : 'Sign'} {learnIndex + 1} / {signs.length}</span>
                        </div>
                    </div>
                    <div className="question-area">
                        <div className="main-image-container" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <img src={sign.image} alt={sign.name} className="question-image" style={{ maxHeight: '300px' }} />
                        </div>
                        <h2 className={`question-text ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                            {cleanSignName(sign.name)}
                        </h2>
                    </div>
                    <div className="quiz-footer" style={{ justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
                        <button className="next-btn" onClick={handlePrevLearn} style={{ background: 'rgba(255,255,255,0.1)' }}>
                            {isUrdu ? 'پچھلا' : 'Prev'}
                        </button>
                        <button className="next-btn" onClick={() => setView('gallery')} style={{ background: 'rgba(239,68,68,0.2)', color: '#fee2e2' }}>
                            {isUrdu ? 'بند کریں' : 'Close'}
                        </button>
                        <button className="next-btn" onClick={handleNextLearn}>
                            {isUrdu ? 'اگلا' : 'Next'}
                        </button>
                    </div>
                    </div>
                    {seoContent}
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
