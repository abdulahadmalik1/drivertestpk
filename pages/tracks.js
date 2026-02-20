import Head from 'next/head';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { DRIVING_TRACKS } from '../lib/constants';

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
                <Head>
                    <title>Driving Tracks — L-Shape & S-Shape Pakistan Driving Test</title>
                    <meta name="description" content="Learn L-Shape and S-Shape driving tracks required for Pakistan driving license test. Step-by-step photo guide." />
                    {DRIVING_TRACKS.map(t => <link key={t.thumbnail} rel="preload" href={t.thumbnail} as="image" />)}
                </Head>
                <div className="app-container">
                    <div className="glass-card splash-card" style={{ gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                            <button className="quit-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} onClick={() => router.push('/')}>← Back</button>
                            <h1 style={{ margin: 0, fontSize: '1.3rem' }}>{isMenuUrdu ? 'ڈرائیونگ ٹریکس' : 'Driving Tracks'}</h1>
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
            </div>
        </>
    );
}

// SSG
export async function getStaticProps() {
    return { props: {} };
}
