import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { QUIZ_MODES, shuffleArray, getOptionStatus, MenuCard } from '../lib/constants';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Pakistan Driving License Quiz",
  "description": "Take our free online traffic sign quiz to prepare for the Pakistan driving license test. Practice multiple-choice questions in English and Urdu.",
  "url": "https://drivetestpk.com/quiz"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://drivetestpk.com/" },
    { "@type": "ListItem", "position": 2, "name": "Driving Test Quiz", "item": "https://drivetestpk.com/quiz" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What do the different shapes of traffic signs mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Pakistan's traffic sign test, shapes are critical: circles mean mandatory orders (you must do it), triangles are warning signs (danger ahead), and rectangles provide information or guidance."
      }
    },
    {
      "@type": "Question",
      "name": "What do the different colors on traffic signs signify?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Red usually signifies a prohibition or danger. Blue circles indicate a mandatory positive instruction (like 'Turn Left Ahead'). Green or blue rectangles are used for directions and information."
      }
    },
    {
      "@type": "Question",
      "name": "Which traffic signs are most commonly failed in the test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Candidates frequently confuse 'No Stopping' and 'No Parking' signs, as well as the 'Give Way' and 'Stop' signs. Make sure to study the subtle differences in our sign gallery before taking the quiz."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to memorize the Urdu names of the signs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While you can choose to take the computerized test in English, knowing the Urdu terminology is highly recommended as the official test often displays both languages."
      }
    },
    {
      "@type": "Question",
      "name": "How many traffic sign questions are asked in the driving test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The computerized e-sign test typically consists of 10 to 20 multiple-choice questions depending on your province (DLIMS Punjab, Sindh, or ITP). You must score above 50% to pass."
      }
    },
    {
      "@type": "Question",
      "name": "Is the traffic sign test computerized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, across major testing centers in Pakistan, the traffic sign test has been completely digitized into an 'e-sign test' using touch-screen computers."
      }
    }
  ]
};

const seoHead = (
  <Head>
    <title>Pakistan Driving Test Quiz | Practice Traffic Signs Online</title>
    <meta name="description" content="Take our free online traffic sign quiz to prepare for the Pakistan driving license test. Practice multiple-choice questions in English and Urdu." />
    <link rel="canonical" href="https://drivetestpk.com/quiz" />
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
      <h1>Pakistan Driving License Traffic Sign Quiz (پاکستان ڈرائیونگ لائسنس ٹریفک سائن کوئز)</h1>
      <p>Passing the computerized traffic sign test (e-sign test) is your first major hurdle in getting a driving license. This mock simulator tests your knowledge of all official traffic signs to ensure you are fully prepared for the real exam.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">کمپیوٹرائزڈ ٹریفک سائن ٹیسٹ (ای سائن ٹیسٹ) پاس کرنا ڈرائیونگ لائسنس کے حصول میں آپ کی پہلی بڑی رکاوٹ ہے۔ یہ ماک سمیلیٹر آپ کے علم کی جانچ کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ آپ اصل امتحان کے لیے پوری طرح تیار ہیں۔</span></p>
      
      <div className="seo-accordion-container">
        <details className="seo-accordion">
          <summary>What do the different shapes of traffic signs mean? (ٹریفک نشانات کی مختلف اشکال کا کیا مطلب ہے؟)</summary>
          <div className="accordion-content">
             <p>In Pakistan's traffic sign test, shapes are critical: circles mean mandatory orders (you must do it), triangles are warning signs (danger ahead), and rectangles provide information or guidance.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">پاکستان کے ٹریفک سائن ٹیسٹ میں، شکلیں بہت اہم ہیں: دائروں کا مطلب لازمی احکامات ہیں، تکون انتباہی نشانات ہیں (آگے خطرہ ہے)، اور مستطیل معلومات یا رہنمائی فراہم کرتے ہیں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>What do the different colors on traffic signs signify? (ٹریفک نشانات پر مختلف رنگ کیا ظاہر کرتے ہیں؟)</summary>
          <div className="accordion-content">
            <p>Red usually signifies a prohibition or danger. Blue circles indicate a mandatory positive instruction (like &quot;Turn Left Ahead&quot;). Green or blue rectangles are used for directions and information.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">سرخ رنگ عام طور پر ممانعت یا خطرے کو ظاہر کرتا ہے۔ نیلے دائرے لازمی مثبت ہدایت کی نشاندہی کرتے ہیں (جیسے &quot;آگے سے بائیں مڑیں&quot;)۔ سبز یا نیلے مستطیل سمتوں اور معلومات کے لیے استعمال ہوتے ہیں۔</span></p>
          </div>
        </details>
        
        <details className="seo-accordion">
          <summary>Which traffic signs are most commonly failed in the test? (ٹیسٹ میں کون سے ٹریفک نشانات میں سب سے زیادہ فیل ہوتے ہیں؟)</summary>
          <div className="accordion-content">
            <p>Candidates frequently confuse &quot;No Stopping&quot; and &quot;No Parking&quot; signs, as well as the &quot;Give Way&quot; and &quot;Stop&quot; signs. Make sure to study the subtle differences in our <Link href="/learn">sign gallery</Link> before taking the quiz.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">امیدوار اکثر &quot;نو سٹاپنگ&quot; اور &quot;نو پارکنگ&quot; کے نشانات، نیز &quot;راستہ دیں&quot; اور &quot;رکیں&quot; کے نشانات میں الجھ جاتے ہیں۔ کوئز دینے سے پہلے ہماری سائن گیلری میں ان کے باریک فرق کا مطالعہ ضرور کریں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>Do I need to memorize the Urdu names of the signs? (کیا مجھے نشانات کے اردو نام یاد کرنے کی ضرورت ہے؟)</summary>
          <div className="accordion-content">
            <p>While you can choose to take the computerized test in English, knowing the Urdu terminology is highly recommended as the official test often displays both languages.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">اگرچہ آپ انگریزی میں کمپیوٹرائزڈ ٹیسٹ دینے کا انتخاب کر سکتے ہیں، لیکن اردو اصطلاحات جاننے کی انتہائی سفارش کی جاتی ہے کیونکہ سرکاری ٹیسٹ میں اکثر دونوں زبانیں دکھائی جاتی ہیں۔</span></p>
          </div>
        </details>

        <details className="seo-accordion">
          <summary>How many traffic sign questions are asked in the driving test? (ڈرائیونگ ٹیسٹ میں ٹریفک نشانات کے کتنے سوالات پوچھے جاتے ہیں؟)</summary>
          <div className="accordion-content">
            <p>The computerized e-sign test typically consists of 10 to 20 multiple-choice questions depending on your province (DLIMS Punjab, Sindh, or ITP). You must score at least 50% to pass.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">صوبے کے لحاظ سے کمپیوٹرائزڈ ای سائن ٹیسٹ عام طور پر 10 سے 20 سوالات پر مشتمل ہوتا ہے۔ پاس ہونے کے لیے آپ کو کم از کم 50% سکور کرنا ہوگا۔</span></p>
          </div>
        </details>
        
        <details className="seo-accordion">
          <summary>Is the traffic sign test computerized? (کیا ٹریفک سائن ٹیسٹ کمپیوٹرائزڈ ہے؟)</summary>
          <div className="accordion-content">
            <p>Yes, across major testing centers in Pakistan, the traffic sign test has been completely digitized into an &quot;e-sign test&quot; using touch-screen computers.<br/><br/><span style={{fontFamily: 'Noto Nastaliq Urdu, Arial', fontSize: '0.95rem'}} dir="rtl">جی ہاں، پاکستان کے بڑے ٹیسٹنگ مراکز میں، ٹریفک سائن ٹیسٹ کو ٹچ سکرین کمپیوٹرز کا استعمال کرتے ہوئے مکمل طور پر &quot;ای سائن ٹیسٹ&quot; میں ڈیجیٹائز کر دیا گیا ہے۔</span></p>
          </div>
        </details>
      </div>
    </article>
    </div>
  </details>
);

// Preload all images for the given questions, tracking progress
function preloadImages(questions, onProgress) {
    const urls = [];
    questions.forEach(q => {
        if (q.image) urls.push(q.image);
        q.options?.forEach(o => { if (o.image) urls.push(o.image); });
    });
    if (urls.length === 0) { onProgress(1, 1); return Promise.resolve(); }

    let done = 0;
    return Promise.all(urls.map(src => new Promise(resolve => {
        const img = new window.Image();
        img.onload = img.onerror = () => { onProgress(++done, urls.length); resolve(); };
        img.src = src;
    })));
}

export default function QuizPage({ quizData }) {
    const router = useRouter();
    const { menuLang } = useLang();
    const isMenuUrdu = menuLang === 'urdu';

    const [screen, setScreen] = useState('picker'); // picker | loading | quiz | result
    const [language, setLanguage] = useState('english');
    const [questions, setQuestions] = useState([]);
    const [loadProgress, setLoadProgress] = useState({ done: 0, total: 0 });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);

    const isUrdu = language === 'urdu';

    const startQuiz = useCallback(async (lang, count) => {
        const selected = shuffleArray(quizData[lang]).slice(0, count);
        setLanguage(lang);
        setQuestions(selected);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setLoadProgress({ done: 0, total: 0 });
        setScreen('loading');

        await preloadImages(selected, (done, total) => {
            setLoadProgress({ done, total });
        });

        setScreen('quiz');
    }, [quizData]);

    const handleOptionClick = useCallback((optionId) => {
        if (isAnswerChecked) return;
        setSelectedOption(optionId);
        setIsAnswerChecked(true);
        if (optionId === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    }, [isAnswerChecked, questions, currentQuestionIndex]);

    const handleNext = useCallback(() => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswerChecked(false);
            setSelectedOption(null);
        } else {
            setScreen('result');
        }
    }, [currentQuestionIndex, questions.length]);

    const quizModes = useMemo(() => QUIZ_MODES.map(m => ({
        ...m,
        label: isMenuUrdu ? { short: 'مختصر', medium: 'معیاری', long: 'طویل' }[m.key] : m.key.charAt(0).toUpperCase() + m.key.slice(1),
        sub: isMenuUrdu ? `${m.count} سوالات` : `${m.count} Questions`,
    })), [isMenuUrdu]);

    // ── Quiz Picker ──
    if (screen === 'picker') {
        return (
            <>
                {seoHead}
                <div className="app-container">
                    <div className="glass-card splash-card">
                        <h1>{isMenuUrdu ? 'مشکل منتخب کریں' : 'Choose Quiz Length'}</h1>
                        <p className="subtitle">
                            {isMenuUrdu ? 'اپنی پسند کا ٹیسٹ چنیں' : 'Pick how many questions you want'}
                        </p>
                        <div className="action-menu" style={{ gap: '0.75rem' }}>
                            {quizModes.map(m => (
                                <MenuCard
                                    key={m.count}
                                    icon={m.icon}
                                    title={m.label}
                                    subtitle={m.sub}
                                    style={{ background: m.color, borderColor: m.border }}
                                    onClick={() => startQuiz(menuLang, m.count)}
                                />
                            ))}
                        </div>
                        <button className="quit-btn" style={{ marginTop: '1.25rem' }} onClick={() => router.push('/')}>
                            {isMenuUrdu ? '← واپس' : '← Back'}
                        </button>
                    </div>
                    {seoContent}
                </div>
            </>
        );
    }

    // ── Loading Screen ──
    if (screen === 'loading') {
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

    // ── Result screen ──
    if (screen === 'result') {
        const percentage = Math.round((score / questions.length) * 100);
        let message;
        if (isUrdu) {
            if (percentage > 80) message = 'بہترین! آپ کی تیاری بہت اچھی ہے۔';
            else if (percentage > 50) message = 'اچھی کوشش، مزید پریکٹس جاری رکھیں۔';
            else message = 'جاری رکھیں! مزید محنت کی ضرورت ہے۔';
        } else {
            if (percentage > 80) message = 'Excellent Driving Knowledge!';
            else if (percentage > 50) message = 'Good effort, keep practicing.';
            else message = 'Keep learning!';
        }
        return (
            <>
                <Head>
                    <title>Quiz Result — Pakistan Driving Test</title>
                    <link rel="canonical" href="https://drivetestpk.com/quiz" />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                </Head>
                <div className="app-container">
                    <div className="glass-card results-container">
                        <h1>Quiz Completed!</h1>
                        <div className="score-display">{percentage}%</div>
                        <div className="message">
                            {isUrdu ? 'آپ کا سکور:' : 'Your Score:'} {score} / {questions.length}
                            <br />
                            {message}
                        </div>
                        <button className="next-btn" onClick={() => router.push('/')}>
                            {isUrdu ? 'دوبارہ شروع کریں' : 'Back to Menu'}
                        </button>
                    </div>
                    {seoContent}
                </div>
            </>
        );
    }

    // ── Active Quiz ──
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;
    const hasImageOptions = currentQuestion.options.some(opt => opt.image);

    return (
        <>
            <Head>
                <title>Question {currentQuestionIndex + 1} — Pakistan Driving Test</title>
                <link rel="canonical" href="https://drivetestpk.com/quiz" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            </Head>
            <div className="app-container">
                <div className="glass-card quiz-card">
                    <div className="quiz-header">
                        <div className="header-info">
                            <span>{isUrdu ? 'سوال' : 'Question'} {currentQuestionIndex + 1} / {questions.length}</span>
                            <span>{isUrdu ? 'سکور' : 'Score'}: {score}</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
                        </div>
                    </div>

                    <div className="question-area">
                        {currentQuestion.image && (
                            <div className="main-image-container">
                                <img src={currentQuestion.image} alt="Question Sign" className="question-image" fetchpriority="high" />
                            </div>
                        )}
                        <h2 className={`question-text ${isUrdu ? 'urdu' : ''}`}>{currentQuestion.question}</h2>
                    </div>

                    <div className={`options-grid ${!hasImageOptions ? 'text-only' : ''}`}>
                        {currentQuestion.options.map(opt => {
                            if (!opt.text && !opt.image) return null;
                            const statusClass = getOptionStatus(opt, isAnswerChecked, selectedOption, currentQuestion.correctAnswer);
                            return (
                                <button
                                    key={opt.id}
                                    className={`option-btn ${statusClass} ${isUrdu ? 'urdu' : ''}`}
                                    onClick={() => handleOptionClick(opt.id)}
                                    disabled={isAnswerChecked}
                                >
                                    {opt.image
                                        ? <img src={opt.image} alt={`Option ${opt.id}`} className="option-image" />
                                        : <span>{opt.text}</span>
                                    }
                                </button>
                            );
                        })}
                    </div>

                    <div className="quiz-footer" style={{ justifyContent: 'space-between', width: '100%', gap: '0.75rem' }}>
                        <button className="quit-btn" onClick={() => router.push('/')}>
                            {isUrdu ? 'چھوڑیں' : 'Quit'}
                        </button>
                        {isAnswerChecked && (
                            <button className="next-btn" onClick={handleNext}>
                                {isUrdu ? 'اگلا سوال' : 'Next Question'}
                            </button>
                        )}
                    </div>
                    </div>
                    {seoContent}
                </div>
            </>
    );
}

export async function getStaticProps() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'public', 'quiz_data.json');
    const quizData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return {
        props: { quizData }
    };
}
