import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PROVINCES } from '../lib/constants';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Official DLIMS & Pakistan Driving License Portals",
  "description": "Direct access to official Pakistan driving license portals. Register, track, and verify your license through DLIMS Punjab, DLS Sindh, and ITP Islamabad.",
  "url": "https://drivetestpk.com/links"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drivetestpk.com/" },
    { "@type": "ListItem", "position": 2, "name": "Helpful Links", "item": "https://drivetestpk.com/links" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I verify my driving license online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, using portals like DLIMS Punjab or DLS Sindh, you can verify the authenticity and status of your driving license online by entering your CNIC number."
      }
    },
    {
      "@type": "Question",
      "name": "How do I apply for an e-license?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you pass your driving test, you can download an electronic copy (e-license) directly from your province's official DLIMS website."
      }
    }
  ]
};

const seoContent = (
  <details className="seo-master-accordion">
    <summary className="seo-master-summary">Read FAQs & Guide</summary>
    <div className="seo-content-wrapper">
    <article className="seo-content">
      <h1>Official DLIMS & Pakistan Driving License Portals (سرکاری DLIMS اور ڈرائیونگ لائسنس پورٹلز)</h1>
      <p>Navigating government websites can sometimes be confusing. This page provides a curated, direct list of official web portals for driving license issuance, verification, and management across Pakistan&apos;s provinces.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">سرکاری ویب سائٹس تلاش کرنا بعض اوقات الجھن کا باعث بن سکتا ہے۔ یہ صفحہ پاکستان کے صوبوں میں ڈرائیونگ لائسنس کے اجراء، تصدیق اور انتظام کے لیے سرکاری ویب پورٹلز کی براہ راست اور مستند فہرست فراہم کرتا ہے۔</span></p>
      
      <h2>What This Tool Does (یہ ٹول کیا کرتا ہے)</h2>
      <p>We provide safe, direct links to the official Driving License Issuance and Management Systems (DLIMS) for Punjab, Sindh, Islamabad, and other regions. You can click on the respective buttons to be securely redirected to the government sites.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">ہم پنجاب، سندھ، اسلام آباد اور دیگر علاقوں کے لیے سرکاری (DLIMS) کے محفوظ اور براہ راست لنکس فراہم کرتے ہیں۔ آپ سرکاری سائٹس پر محفوظ طریقے سے جانے کے لیے متعلقہ بٹنوں پر کلک کر سکتے ہیں۔</span></p>
      
      <h2>Who Should Use It? (اسے کسے استعمال کرنا چاہیے؟)</h2>
      <p>This directory is meant for all Pakistani citizens who need to register for a learner&apos;s permit, renew an expired license, check their application status, or download a digital e-license.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">یہ ان تمام پاکستانی شہریوں کے لیے ہے جنہیں لرنر پرمٹ کے لیے رجسٹر کرنے، میعاد ختم ہونے والے لائسنس کی تجدید کرنے، اپنی درخواست کا اسٹیٹس چیک کرنے، یا ڈیجیٹل ای لائسنس ڈاؤن لوڈ کرنے کی ضرورت ہے۔</span></p>
      
      <h2>Why It Is Useful (یہ کیوں مفید ہے)</h2>
      <p>Using the exact official URLs protects you from phishing and fake websites. Having all provincial portals in one place saves you time and ensures you are accessing the correct services, whether you are in Lahore, Karachi, or Islamabad.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">درست سرکاری لنکس کا استعمال آپ کو جعلی ویب سائٹس سے بچاتا ہے۔ تمام صوبائی پورٹلز کا ایک جگہ ہونا آپ کا وقت بچاتا ہے اور یقینی بناتا ہے کہ آپ درست سروسز استعمال کر رہے ہیں۔</span></p>
      
      <h2>Expert Tips (ماہرین کے مشورے)</h2>
      <ul>
        <li><strong>E-Licenses (ای لائسنس):</strong> Keep a digital copy of your e-license downloaded on your phone. It is legally valid across Pakistan.</li>
        <li><strong>Prepare Before Hand (پہلے سے تیاری):</strong> Before you apply on the DLIMS portal, ensure your CNIC is valid and you have studied the <Link href="/learn">traffic signs guide</Link>.</li>
      </ul>

      <div className="seo-faq">
        <h2>Frequently Asked Questions (عمومی سوالات)</h2>
        <div className="seo-faq-item">
          <h3>Can I verify my driving license online? (کیا میں اپنا ڈرائیونگ لائسنس آن لائن چیک کر سکتا ہوں؟)</h3>
          <p>Yes, using portals like DLIMS Punjab or DLS Sindh, you can verify the authenticity and status of your driving license online by entering your CNIC number.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">جی ہاں، ڈی ایل آئی ایم ایس (DLIMS) پنجاب یا ڈی ایل ایس (DLS) سندھ جیسے پورٹلز کا استعمال کرتے ہوئے، آپ اپنا شناختی کارڈ نمبر درج کرکے اپنے لائسنس کی آن لائن تصدیق کر سکتے ہیں۔</span></p>
        </div>
        <div className="seo-faq-item">
          <h3>How do I apply for an e-license? (میں ای لائسنس کے لیے کیسے اپلائی کروں؟)</h3>
          <p>Once you pass your driving test, you can download an electronic copy (e-license) directly from your province&apos;s official DLIMS website.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">ڈرائیونگ ٹیسٹ پاس کرنے کے بعد، آپ اپنے صوبے کی سرکاری ویب سائٹ سے براہ راست الیکٹرانک کاپی (ای لائسنس) ڈاؤن لوڈ کر سکتے ہیں۔</span></p>
        </div>
      </div>
    </article>
    </div>
  </details>
);

export default function LinksPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>DLIMS Punjab, Sindh & Islamabad — Pakistan Driving License Portals</title>
                <meta name="description" content="Direct links to DLIMS Punjab, DLS Sindh, and ITP Islamabad portals. Register, verify, and renew your Pakistan driving license online." />
                <link rel="canonical" href="https://drivetestpk.com/links" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            </Head>

            <div className="app-container">
                <div className="glass-card" style={{ maxHeight: '98vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexShrink: 0 }}>
                        <button className="quit-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} onClick={() => router.push('/')}>← Back</button>
                        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9' }}>Helpful Links</h2>
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
                {seoContent}
            </div>
        </>
    );
}

// SSG — all province links visible to Google at build time
export async function getStaticProps() {
    return { props: {} };
}
