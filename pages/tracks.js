import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { DRIVING_TRACKS } from '../lib/constants';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "L-Shape and S-Shape Driving Tracks Guide",
  "description": "Master the L-shape and S-shape practical driving tracks. View step-by-step photos and dimensions to easily pass your Pakistan driving license test.",
  "url": "https://drivetestpk.com/tracks"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drivetestpk.com/" },
    { "@type": "ListItem", "position": 2, "name": "Driving Tracks", "item": "https://drivetestpk.com/tracks" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the L-shape driving track test in Pakistan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The L-shape track is a practical test where you must navigate a vehicle forward and backward through an L-shaped corridor of cones. It tests your ability to reverse using side mirrors without hitting the boundary."
      }
    },
    {
      "@type": "Question",
      "name": "How many times can I reverse my vehicle during the L-shape test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically, you are allowed only one continuous reverse maneuver to exit the L-shape. Stopping and moving forward again to adjust your alignment usually results in immediate failure."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I touch a traffic cone during the practical test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Touching or knocking over a traffic cone during the L-shape or S-shape track test results in an automatic and immediate failure. You will need to wait for a mandatory period before retaking the test."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take the practical driving test on an automatic car?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you take the test on an automatic car, your driving license will be restricted to automatic vehicles only. If you pass using a manual car, your license will be valid for both manual and automatic vehicles."
      }
    },
    {
      "@type": "Question",
      "name": "Do I have to use my own car for the driving test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually, the traffic police provide a test vehicle (like a Mehran or Cultus). However, at some specific testing centers, you may be allowed or required to use your own vehicle. It is best to confirm with your local DLIMS center."
      }
    }
  ]
};

const seoHead = (
  <Head>
    <title>Driving Tracks — L-Shape & S-Shape Pakistan Driving Test</title>
    <meta name="description" content="Learn L-Shape and S-Shape driving tracks required for Pakistan driving license test. Step-by-step photo guide." />
    <link rel="canonical" href="https://drivetestpk.com/tracks" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    {DRIVING_TRACKS.map(t => <link key={t.thumbnail} rel="preload" href={t.thumbnail} as="image" />)}
  </Head>
);

const seoContent = (
  <details className="seo-master-accordion">
    <summary className="seo-master-summary">Read FAQs & Guide</summary>
    <div className="seo-content-wrapper">
    <article className="seo-content">
      <h1>Pakistan Driving License Practical Track Guide (پاکستان ڈرائیونگ لائسنس پریکٹیکل ٹریک گائیڈ)</h1>
      <p>Passing the computerized e-sign test is only half the battle. The final and most challenging step to obtaining your Pakistan driving license is the practical driving test. This visual guide breaks down the notorious L-shape and S-shape tracks used by traffic police nationwide.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">کمپیوٹرائزڈ ای سائن ٹیسٹ پاس کرنا صرف آدھی کامیابی ہے۔ پاکستان کا ڈرائیونگ لائسنس حاصل کرنے کا آخری اور مشکل ترین مرحلہ پریکٹیکل ڈرائیونگ ٹیسٹ ہے۔ یہ بصری گائیڈ ٹریفک پولیس کے زیر استعمال مشہور ایل-شیپ اور ایس-شیپ ٹریکس کی تفصیل بیان کرتی ہے۔</span></p>
      
      <h2>Critical Rules for the Practical Test (پریکٹیکل ٹیسٹ کے اہم اصول)</h2>
      <p>Before you even begin moving the vehicle, the testing officer is evaluating you. Failing to follow these basic pre-drive protocols will cost you valuable points or result in an instant fail: <br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">گاڑی چلانا شروع کرنے سے پہلے ہی، ٹیسٹنگ افسر آپ کا جائزہ لے رہا ہوتا ہے۔ ڈرائیونگ سے پہلے کے ان بنیادی اصولوں پر عمل نہ کرنے کی صورت میں آپ کے قیمتی پوائنٹس کٹ سکتے ہیں یا آپ فوری طور پر فیل ہو سکتے ہیں:</span></p>
      <ul>
        <li><strong>Seatbelt First (پہلے سیٹ بیلٹ):</strong> Fasten your seatbelt immediately after sitting in the driver&apos;s seat. Do not turn the ignition key until you are buckled up.</li>
        <li><strong>Mirror Adjustments (شیشے سیٹ کریں):</strong> Visibly adjust your rearview and side mirrors. The L-shape reverse test relies entirely on your side mirrors; do not stick your head out of the window.</li>
        <li><strong>Both Hands on the Wheel (دونوں ہاتھ سٹیرنگ پر):</strong> Keep both hands on the steering wheel at the 9 and 3 o&apos;clock or 10 and 2 o&apos;clock positions.</li>
        <li><strong>Use Indicators (اشاروں کا استعمال):</strong> Even on the closed track, use your turn signals when initiating a turn.</li>
      </ul>

      <div className="seo-accordion-container">
        <details className="seo-accordion">
          <summary>What is the L-shape driving track test in Pakistan? (پاکستان میں ایل-شیپ ڈرائیونگ ٹریک ٹیسٹ کیا ہے؟)</summary>
          <div className="accordion-content">
             <p>The L-shape track is a practical test where you must navigate a vehicle forward and backward through an L-shaped corridor of cones. It tests your ability to reverse using side mirrors without hitting the boundary.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">ایل-شیپ ٹریک ایک پریکٹیکل ٹیسٹ ہے جس میں آپ کو کونز کے ایل نما راستے سے گاڑی کو آگے اور پیچھے لے جانا ہوتا ہے۔ یہ سائیڈ شیشوں کا استعمال کرتے ہوئے حد کو چھوئے بغیر ریورس کرنے کی آپ کی صلاحیت کو جانچتا ہے۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>How many times can I reverse my vehicle during the L-shape test? (ایل-شیپ ٹیسٹ کے دوران میں کتنی بار گاڑی ریورس کر سکتا ہوں؟)</summary>
          <div className="accordion-content">
            <p>Typically, you are allowed only one continuous reverse maneuver to exit the L-shape. Stopping and moving forward again to adjust your alignment usually results in immediate failure.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">عام طور پر، آپ کو ایل-شیپ سے نکلنے کے لیے صرف ایک مسلسل ریورس کی اجازت ہوتی ہے۔ رکنا اور اپنی سیدھ ٹھیک کرنے کے لیے دوبارہ آگے بڑھنے کا مطلب عام طور پر فوری ناکامی ہے۔</span></p>
          </div>
        </details>
        
        <details className="seo-accordion">
          <summary>What happens if I touch a traffic cone during the practical test? (اگر ٹیسٹ کے دوران کون سے گاڑی ٹکرا جائے تو کیا ہوگا؟)</summary>
          <div className="accordion-content">
            <p>Touching or knocking over a traffic cone during the L-shape or S-shape track test results in an automatic and immediate failure. You will need to wait for a mandatory period before retaking the test.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">پریکٹیکل ٹیسٹ کے دوران ٹریفک کون کو چھونا یا گرانا فوری اور خودکار ناکامی کا باعث بنتا ہے۔ آپ کو دوبارہ ٹیسٹ دینے کے لیے لازمی مدت تک انتظار کرنا ہوگا۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>Can I take the practical driving test on an automatic car? (کیا میں آٹومیٹک گاڑی پر ٹیسٹ دے سکتا ہوں؟)</summary>
          <div className="accordion-content">
            <p>If you take the test on an automatic car, your driving license will be restricted to automatic vehicles only. If you pass using a manual car, your license will be valid for both manual and automatic vehicles.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">اگر آپ آٹومیٹک کار پر ٹیسٹ دیتے ہیں، تو آپ کا ڈرائیونگ لائسنس صرف آٹومیٹک گاڑیوں تک محدود ہوگا۔ اگر آپ مینوئل گاڑی استعمال کر کے پاس ہوتے ہیں، تو آپ کا لائسنس دونوں قسم کی گاڑیوں کے لیے کارآمد ہوگا۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>Do I have to use my own car for the driving test? (کیا مجھے ڈرائیونگ ٹیسٹ کے لیے اپنی گاڑی استعمال کرنی ہوگی؟)</summary>
          <div className="accordion-content">
            <p>Usually, the traffic police provide a test vehicle (like a Mehran or Cultus). However, at some specific testing centers, you may be allowed or required to use your own vehicle. It is best to confirm with your local DLIMS center.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">عام طور پر، ٹریفک پولیس ٹیسٹ کے لیے گاڑی (جیسے مہران یا کلٹس) فراہم کرتی ہے۔ تاہم، کچھ مخصوص مراکز پر آپ کو اپنی گاڑی استعمال کرنے کی اجازت یا ضرورت ہو سکتی ہے۔ بہتر ہے کہ اپنے مقامی سینٹر سے تصدیق کر لیں۔</span></p>
          </div>
        </details>
      </div>
    </article>
  </div>
  </details>
);

export default function TracksPage() {
    const router = useRouter();
    const { menuLang } = useLang();
    const isMenuUrdu = menuLang === 'urdu';

    const [view, setView] = useState('gallery'); // gallery | detail
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackImageIndex, setTrackImageIndex] = useState(0);

    const openTrackDetail = useCallback((idx) => {
        setTrackIndex(idx);
        setTrackImageIndex(0);
        setView('detail');
    }, []);

    const handleTrackNextImage = useCallback((max) => setTrackImageIndex(p => (p + 1) % max), []);
    const handleTrackPrevImage = useCallback((max) => setTrackImageIndex(p => (p - 1 + max) % max), []);

    // ── Gallery ──
    if (view === 'gallery') {
        return (
            <>
                {seoHead}
                <div className="app-container">
                    <div className="glass-card splash-card" style={{ gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                            <button className="quit-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} onClick={() => router.push('/')}>← Back</button>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9' }}>{isMenuUrdu ? 'ڈرائیونگ ٹریکس' : 'Driving Tracks'}</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            {DRIVING_TRACKS.map((track, idx) => (
                                <div key={track.id} onClick={() => openTrackDetail(idx)} className="track-card">
                                    <img src={track.thumbnail} alt={track.name.en} className="track-thumbnail" loading="lazy" />
                                    <div className="track-card-info">
                                        <h3>{isMenuUrdu ? track.name.ur : track.name.en}</h3>
                                        <p>{isMenuUrdu ? `${track.images.length} تصاویر` : `${track.images.length} Photos`}</p>
                                    </div>
                                    <div className="card-arrow">→</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {seoContent}
                </div>
            </>
        );
    }

    // ── Detail ──
    const track = DRIVING_TRACKS[trackIndex];
    if (!track) return null;
    return (
        <>
            <Head>
                <title>{track.name.en} — Pakistan Driving License Track Guide</title>
                <meta name="description" content={`Step-by-step photo guide for the ${track.name.en} driving track required in Pakistan driving license tests.`} />
                <link rel="canonical" href="https://drivetestpk.com/tracks" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                {track.images.map(img => <link key={img} rel="preload" href={img} as="image" />)}
            </Head>
            <div className="app-container">
                <div className="glass-card quiz-card">
                    <div className="quiz-header">
                        <div className="header-info" style={{ justifyContent: 'space-between' }}>
                            <button className="quit-btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => setView('gallery')}>← Back</button>
                            <span>{isMenuUrdu ? track.name.ur : track.name.en}</span>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{trackImageIndex + 1} / {track.images.length}</span>
                        </div>
                    </div>
                    <div className="question-area" style={{ position: 'relative', flex: 1 }}>
                        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                            <img
                                src={track.images[trackImageIndex]}
                                alt={`${track.name.en} step ${trackImageIndex + 1}`}
                                style={{ width: '100%', height: 'auto', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
                            />
                            {track.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleTrackPrevImage(track.images.length); }}
                                        style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >‹</button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleTrackNextImage(track.images.length); }}
                                        style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', fontSize: '1.4rem', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >›</button>
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1rem' }}>
                            {track.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTrackImageIndex(i)}
                                    style={{ width: i === trackImageIndex ? '20px' : '8px', height: '8px', borderRadius: '4px', background: i === trackImageIndex ? 'var(--primary-color)' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {seoContent}
            </div>
        </>
    );
}

// SSG
export async function getStaticProps() {
    return { props: {} };
}
