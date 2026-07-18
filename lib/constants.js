// ─── Constants ────────────────────────────────────────────────────────────────

export const SIGN_NAME_CLEANUP_RE = /Which of the following indicates |which of the following indicates |What Does this Sign means\?|Which of the following is |Do you know this sign\?|which of the following sign is |which of the following /gi;

export const QUIZ_MODES = [
    { key: 'short', icon: '🎯', count: 10, color: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
    { key: 'medium', icon: '📋', count: 30, color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)' },
    { key: 'long', icon: '🏆', count: 50, color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
];

export const PROVINCES = [
    {
        name: 'Punjab – DLIMS',
        emoji: '🟢',
        color: 'rgba(16,185,129,0.1)',
        border: 'rgba(16,185,129,0.25)',
        links: [
            { label: 'Main Portal', url: 'https://dlims.punjab.gov.pk' },
            { label: 'Login', url: 'https://dlims.punjab.gov.pk/login' },
            { label: 'Register', url: 'https://dlims.punjab.gov.pk/register' },
            { label: 'Verify License', url: 'https://dlims.punjab.gov.pk/verify' },
            { label: 'Track Application', url: 'https://dlims.punjab.gov.pk/track' },
            { label: 'e-License', url: 'https://dlims.punjab.gov.pk/elicense' },
        ],
    },
    {
        name: 'Sindh – DLS Online',
        emoji: '🔵',
        color: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.25)',
        links: [
            { label: 'Main Portal', url: 'https://dlsonline.sindhpolice.gov.pk' },
            { label: 'Login', url: 'https://dlsonline.sindhpolice.gov.pk/auth/login/' },
            { label: 'Register', url: 'https://dlsonline.sindhpolice.gov.pk/auth/register/' },
            { label: 'Verify License', url: 'https://dls.gos.pk/online-verification.html' },
            { label: 'Apply Learner', url: 'https://dlsonline.sindhpolice.gov.pk/dashboard/License/create/' },
            { label: 'Renewal', url: 'https://dlsonline.sindhpolice.gov.pk/dashboard/renewal/create/' },
            { label: 'IDP', url: 'https://dlsonline.sindhpolice.gov.pk/dashboard/idp/create/' },
            { label: 'Fee Structure', url: 'https://dls.gos.pk/FeeStructure.html' },
            { label: 'How to Get License', url: 'https://dls.gos.pk/how-to-ob-dr-lic.html' },
        ],
    },
    {
        name: 'Islamabad – ITP DLIMS',
        emoji: '🟣',
        color: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.25)',
        links: [
            { label: 'Main Portal', url: 'https://dlims.islamabadpolice.gov.pk' },
            { label: 'Login', url: 'https://dlims.islamabadpolice.gov.pk/login' },
            { label: 'Register / Apply Learner', url: 'https://dlims.islamabadpolice.gov.pk/register' },
            { label: 'Verify License', url: 'https://dlims.islamabadpolice.gov.pk/verify-license-information' },
            { label: 'Verify Learner', url: 'https://dlims.islamabadpolice.gov.pk/verify' },
            { label: 'e-License', url: 'https://dlims.islamabadpolice.gov.pk/e-license' },
        ],
    },
    {
        name: 'Fines & Violations',
        emoji: '🚫',
        color: 'rgba(239,68,68,0.1)',
        border: 'rgba(239,68,68,0.25)',
        links: [
            { label: 'Islamabad – Violations & Fine', url: 'https://islamabadpolice.gov.pk/itp/violation-and-fine.php' },
            { label: 'Punjab – Offences & Penalties', url: 'https://trafficpolice.punjab.gov.pk/offences_penalties' },
        ],
    },
];

export const DRIVING_TRACKS = [
    {
        id: 'l-shape',
        name: { en: 'L-Shape Track', ur: 'L-شکل ٹریک' },
        thumbnail: '/tracks/L-shape/L4.png',
        images: ['/tracks/L-shape/L1.webp', '/tracks/L-shape/L2.png', '/tracks/L-shape/L3.png', '/tracks/L-shape/L4.png'],
    },
    {
        id: 's-shape',
        name: { en: 'S-Shape Track', ur: 'S-شکل ٹریک' },
        thumbnail: '/tracks/S-shape/S1.png',
        images: ['/tracks/S-shape/S1.png', '/tracks/S-shape/S2.png', '/tracks/S-shape/S3.png', '/tracks/S-shape/S4.png'],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function cleanSignName(name) {
    return name.replace(SIGN_NAME_CLEANUP_RE, '').replace(/"/g, '').replace(/\?/g, '').trim();
}

export function extractSigns(data) {
    const signs = [];
    data.forEach(q => {
        let image = null;
        let name = '';
        if (q.image) {
            image = q.image;
            const correctOpt = q.options.find(o => o.id === q.correctAnswer);
            if (correctOpt) name = correctOpt.text;
        } else {
            const correctOpt = q.options.find(o => o.id === q.correctAnswer);
            if (correctOpt?.image) {
                image = correctOpt.image;
                name = q.question;
            }
        }
        if (image && name) signs.push({ id: q.id, image, name });
    });
    return signs;
}

export function getOptionStatus(opt, isAnswerChecked, selectedOption, correctAnswer) {
    if (!isAnswerChecked) return selectedOption === opt.id ? 'selected' : '';
    if (opt.id === correctAnswer) return 'correct';
    if (opt.id === selectedOption) return 'wrong';
    return '';
}

// ─── Shared MenuCard component ─────────────────────────────────────────────────

export function MenuCard({ icon, title, subtitle, onClick, className = 'menu-card', style, ariaLabel }) {
    return (
        <button
            className={className}
            style={style}
            onClick={onClick}
            aria-label={ariaLabel || `${title}: ${subtitle}`}
        >
            <div className="card-icon" aria-hidden="true">{icon}</div>
            <div className="card-text">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <div className="card-arrow" aria-hidden="true">→</div>
        </button>
    );
}
