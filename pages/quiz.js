import Head from 'next/head';
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useLang } from './_app';
import { QUIZ_MODES, shuffleArray, getOptionStatus, MenuCard } from '../lib/constants';
import quizData from '../quiz_data.json';

export default function QuizPage() {
    const router = useRouter();
    const { menuLang } = useLang();
    const isMenuUrdu = menuLang === 'urdu';

    const [screen, setScreen] = useState('picker'); // picker | quiz | result
    const [language, setLanguage] = useState('english');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);

    const isUrdu = language === 'urdu';

    const startQuiz = useCallback((lang, count) => {
        setLanguage(lang);
        setQuestions(shuffleArray(quizData[lang]).slice(0, count));
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setScreen('quiz');
    }, []);

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
                <Head><title>Choose Quiz Length — Pakistan Driving Test</title></Head>
                <div className="app-container">
                    <div className="glass-card splash-card">
                        <h1>{isMenuUrdu ? 'مشکل منتخب کریں' : 'Choose Quiz Length'}</h1>
                        <p className="subtitle">{isMenuUrdu ? 'اپنی پسند کا ٹیسٹ چنیں' : 'Pick how many questions you want'}</p>
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
                <Head><title>Quiz Result — Pakistan Driving Test</title></Head>
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
                </div>
            </>
        );
    }

    // ── Active Quiz ──
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;
    const hasImageOptions = currentQuestion.options.some(opt => opt.image);
    // Preload next question's image for snappy transitions
    const nextQuestion = questions[currentQuestionIndex + 1];
    const nextImgSrc = nextQuestion?.image || nextQuestion?.options?.find(o => o.image)?.image;

    return (
        <>
            <Head>
                <title>Question {currentQuestionIndex + 1} — Pakistan Driving Test</title>
                {nextImgSrc && <link rel="prefetch" href={nextImgSrc} as="image" />}
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
            </div>
        </>
    );
}
