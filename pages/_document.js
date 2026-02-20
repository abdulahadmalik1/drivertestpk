import { Html, Head, Main, NextScript } from 'next/document';

const SITE_URL = 'https://traffic-sign-quiz.vercel.app'; // update with your real domain

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/#app`,
        name: 'Pakistan Traffic Sign Quiz & Guide',
        url: SITE_URL,
        description: 'Free Pakistan driving license test practice — 100+ traffic signs quiz in English & Urdu. L-shape and S-shape track guide, DLIMS Punjab, Sindh & Islamabad portals.',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any',
        inLanguage: ['en', 'ur'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
        audience: { '@type': 'Audience', audienceType: 'Pakistan driving license applicants' },
        featureList: [
          'Traffic Signs Quiz in English and Urdu',
          'L-Shape Driving Track Guide',
          'S-Shape Driving Track Guide',
          'DLIMS Punjab License Portal Links',
          'DLS Sindh License Portal Links',
          'ITP Islamabad License Portal Links',
          'Traffic Fines & Violations Reference',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I pass the Pakistan driving license test?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Practice all traffic signs using our free quiz in English or Urdu. Study the L-shape and S-shape driving tracks, and register on your provincial DLIMS portal (Punjab, Sindh, or Islamabad).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is DLIMS Punjab?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'DLIMS (Driving License Issuance and Management System) Punjab is the official online portal for Punjab province driving license registration, renewal, and verification at dlims.punjab.gov.pk.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the L-shape driving track test in Pakistan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The L-shape track is a practical driving test where applicants must navigate their vehicle through an L-shaped path without touching the markers. It tests basic vehicle control skills required for a Pakistan driving license.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many traffic signs are in the Pakistan driving test?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Pakistan driving license test includes questions on over 100 traffic signs covering mandatory signs, warning signs, information signs, and road markings.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Learn Signs', item: `${SITE_URL}/learn` },
          { '@type': 'ListItem', position: 3, name: 'Driving Tracks', item: `${SITE_URL}/tracks` },
          { '@type': 'ListItem', position: 4, name: 'Helpful Links', item: `${SITE_URL}/links` },
        ],
      },
    ],
  };

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f1117" />

        {/* SEO */}
        <meta name="description" content="Free Pakistan driving license test practice — 100+ traffic signs quiz in English & Urdu. L-shape and S-shape track guide, DLIMS Punjab, Sindh & Islamabad portals. Prepare for your driving test today." />
        <meta name="keywords" content="Pakistan driving license test, driving test Pakistan, traffic signs Pakistan, DLIMS Punjab, DLS Sindh, ITP Islamabad, ڈرائیونگ لائسنس ٹیسٹ, traffic signs quiz Urdu, L shape track Pakistan, S shape track, driving test practice online, learner license Pakistan, traffic sign quiz, road signs Pakistan" />
        <meta name="author" content="Traffic Sign Quiz PK" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:site_name" content="Pakistan Traffic Sign Quiz & Guide" />
        <meta property="og:title" content="Pakistan Driving License Test — Free Practice Quiz" />
        <meta property="og:description" content="Practice 100+ traffic signs in English & Urdu. Driving tracks, DLIMS portals, traffic fines — everything to pass your test." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/logo512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="en_PK" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Pakistan Driving License Test — Free Practice Quiz" />
        <meta name="twitter:description" content="Practice traffic signs in English & Urdu. Driving tracks, DLIMS portals & more." />
        <meta name="twitter:image" content={`${SITE_URL}/logo512.png`} />

        {/* PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect for faster font/resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* JSON-LD Structured Data — key for rich results and fast ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
