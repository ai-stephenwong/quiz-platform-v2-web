import { useState, useEffect } from 'react'
import './Question.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function Question({
  question,
  questionNumber,
  total,
  selectedAnswer,
  onAnswer,
  onNext,
  isLast,
}) {
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    setAnswered(selectedAnswer !== undefined)
  }, [selectedAnswer, questionNumber])

  const handleSelect = (idx) => {
    if (answered) return
    setAnswered(true)
    onAnswer(idx)
    onNext() // auto-advance immediately, no answer revealed
  }

  const pct = Math.round(((questionNumber - 1) / total) * 100) + Math.round(100 / total / 2)

  return (
    <div className="question-wrap">
      <div className="progress-label">Question {questionNumber} of {total}</div>
      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>

      <div className="question-card">
        <div className="question-num">
          Question {questionNumber} of {total} &bull; {question.topic}
        </div>
        <div className="question-text">{question.text}</div>

        <div className="options">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              className="option-btn"
              onClick={() => handleSelect(idx)}
              disabled={answered}
            >
              <span className="letter">{LETTERS[idx]}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
