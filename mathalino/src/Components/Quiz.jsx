import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import trophy from '../assets/trophy.png';
import likeDown from '../assets/likedown.png';
import likeUp from '../assets/upsolid.png';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const query = useQuery();
    const operation = query.get('operation');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5273/api/questions');
                console.log('API Response:', response.data); 

                const filteredQuestions = response.data.filter(q => q.operator === operation);
                console.log('Filtered Questions:', filteredQuestions); 

                setQuestions(filteredQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [operation]);

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const getOperatorSymbol = (operator) => {
        switch (operator) {
            case 'addition':
                return '+';
            case 'subtraction':
                return '-';
            case '*':
                return '×';
            case 'division':
                return '÷';
            default:
                return operator;
        }
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === currentQuestion.answer) {
            setFeedback('correct');
            setScore(score + 1);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleContinue = async () => {
        setFeedback(null);
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizCompleted(true);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                try {
                    await axios.post('http://localhost:5273/api/scores', {
                        userId: user.userId,
                        scoreValue: score,
                        operator: operation,
                    });
                    console.log('Quiz result saved successfully');
                } catch (error) {
                    console.error('Error saving quiz result:', error);
                }
            }
        }
    };

    const colors = ['bg-[#1AF2E8]', 'bg-[#E9014D]', 'bg-[#147917]', 'bg-[#0D059E]'];

    const generateOptions = (correctAnswer) => {
        const options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = Math.floor(Math.random() * 20) + 1;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }
        return options.sort(() => Math.random() - 0.5).map((option, index) => ({
            value: option,
            color: colors[index % colors.length],
        }));
    };

    const optionsWithColors = generateOptions(currentQuestion.answer);
    return (
        <div className="min-h-screen bg-[#61ADAB] relative">
            <header className="bg-[#0F382A] p-4 flex items-center z-10 relative">
                <Link to="/home">
                    <button className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-500">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>
                </Link>
            </header>
            <main className="flex flex-col items-center justify-center mt-10 relative">
                {!quizCompleted ? (
                    <>
                        <div className="flex flex-col items-center justify-center bg-green-200 w-full sm:w-112 h-65 text-green-900 text-4xl sm:text-7xl font-bold p-8 rounded-lg mb-4">
                            {`${currentQuestion.operand1} ${getOperatorSymbol(currentQuestion.operator)} ${currentQuestion.operand2}`}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {optionsWithColors.map((optionObj, index) => (
                                <button
                                    key={index}
                                    className={`text-white text-xl sm:text-2xl font-bold p-4 rounded-lg w-100 sm:w-55 h-20 sm:h-30 ${
                                        selectedAnswer === optionObj.value
                                            ? optionObj.value === currentQuestion.answer
                                            : optionObj.color
                                    }`}
                                    onClick={() => handleAnswerClick(optionObj.value)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {optionObj.value}
                                </button>
                            ))}
                        </div>
                        {feedback && (
                            <div className="absolute inset-0 bg-[#61ADAB] bg-opacity-0 flex items-center justify-center z-20">
                                <div className="bg-green-200 w-full sm:w-125 h-80 sm:h-100 text-green-900 text-xl sm:text-3xl font-bold p-8 rounded-lg flex flex-col items-center justify-center">
                                    {feedback === 'correct' ? (
                                        <>
                                            <p className="text-3xl sm:text-5xl mb-1">Good Job!</p>
                                            <img src={likeUp} alt="Correct" className="w-24 sm:w-48 h-24 sm:h-48" />
                                        </>
                                    ) : (
                                        <>
                                            <p>The correct answer is {currentQuestion.answer}.</p>
                                            <img src={likeDown} alt="Incorrect" className="w-24 sm:w-48 h-24 sm:h-48" />
                                        </>
                                    )}
                                    <button
                                        className="bg-yellow-400 text-white text-xl sm:text-2xl font-bold p-4 rounded-lg mt-4 hover:bg-yellow-500"
                                        onClick={handleContinue}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="relative inset-0 bg-[#61ADAB] bg-opacity-0 flex items-center justify-center z-20">
                        <div className="bg-green-200 w-full sm:w-145 h-80 sm:h-120 text-green-900 text-xl sm:text-3xl font-bold p-8 rounded-lg flex flex-col items-center justify-center">
                            <p className="text-3xl sm:text-5xl mb-10">Quiz Completed!</p>
                            <p className="mb-3">Your score is {score} out of {questions.length}</p>
                            <img src={trophy} alt="Trophy" className="w-24 sm:w-48 h-24 sm:h-48" />
                            <Link to="/home">
                                <button className="bg-yellow-400 text-white text-xl sm:text-2xl font-bold p-4 rounded-lg mt-4 hover:bg-yellow-500">
                                    Go to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Quiz;