import Head from 'next/head';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { extractSigns, cleanSignName } from '../lib/constants';
import quizData from '../quiz_data.json';

export default function LearnPage({ signs }) {
    const router = useRouter();
    const { language } = useLang();
    const isUrdu = language === 'urdu';

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
                <Head>
                    <title>Learn Traffic Signs — Pakistan Driving License Guide</title>
                    <meta name="description" content={`Browse all ${signs.length} Pakistan traffic signs with names in English and Urdu. Essential for your driving license test.`} />
                </Head>
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
                                    <img src={sign.image} alt={sign.name} className="gallery-image" loading="lazy" />
                                </div>
                            ))}
                        </div>
                        <div className="quiz-footer">
                            <button className="next-btn" onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>
                                {isUrdu ? 'واپس' : 'Back'}
                            </button>
                        </div>
                    </div>
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
