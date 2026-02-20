import Head from 'next/head';
import { useRouter } from 'next/router';
import { PROVINCES } from '../lib/constants';

export default function LinksPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>DLIMS Punjab, Sindh & Islamabad — Pakistan Driving License Portals</title>
                <meta name="description" content="Direct links to DLIMS Punjab, DLS Sindh, and ITP Islamabad portals. Register, verify, and renew your Pakistan driving license online." />
            </Head>

            <div className="app-container" style={{ height: '100vh', overflow: 'hidden' }}>
                <div className="glass-card" style={{ maxHeight: '98vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexShrink: 0 }}>
                        <button className="quit-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} onClick={() => router.push('/')}>← Back</button>
                        <h1 style={{ margin: 0, fontSize: '1.3rem' }}>Helpful Links</h1>
                    </div>
                    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {PROVINCES.map(prov => (
                            <div key={prov.name} className="province-card" style={{ background: prov.color, borderColor: prov.border }}>
                                <h3 className="province-title">{prov.emoji} {prov.name}</h3>
                                <div className="links-grid">
                                    {prov.links.map(link => (
                                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link-chip">
                                            {link.label} ↗
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// SSG — all province links visible to Google at build time
export async function getStaticProps() {
    return { props: {} };
}
