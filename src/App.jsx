import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import Results from './components/Results'
import { questions as localQuestions } from './data/questions'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('start') // 'start' | 'quiz' | 'results'
  const [questions] = useState(localQuestions)
  const [current, setCurrent] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const handleStart = () => {
    setCurrent(0)
    setUserAnswers([])
    setScreen('quiz')
  }

  const handleAnswer = (questionIndex, answerIndex) => {
    setUserAnswers(prev => {
      const updated = [...prev]
      updated[questionIndex] = answerIndex
      return updated
    })
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setScreen('results')
    } else {
      setCurrent(c => c + 1)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setUserAnswers([])
    setScreen('start')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ISTQB CTFL v4.0 Quiz Platform</h1>
        <p>Certified Tester Foundation Level &mdash; Staff Assessment</p>
      </header>

      <main className="app-main">
        {screen === 'start' && (
          <StartScreen onStart={handleStart} loading={false} />
        )}
        {screen === 'quiz' && questions.length > 0 && (
          <Question
            question={questions[current]}
            questionNumber={current + 1}
            total={questions.length}
            selectedAnswer={userAnswers[current]}
            onAnswer={(idx) => handleAnswer(current, idx)}
            onNext={handleNext}
            isLast={current + 1 === questions.length}
          />
        )}
        {screen === 'results' && (
          <Results
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
