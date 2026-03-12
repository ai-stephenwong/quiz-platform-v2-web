import './Results.css'

const PASS_MARK = 0.75
const LETTERS = ['A', 'B', 'C', 'D']

export default function Results({ questions, userAnswers, onRestart }) {
  const score = userAnswers.filter((ans, i) => ans === questions[i].answer).length
  const total = questions.length
  const pct = Math.round((score / total) * 100)
  const passed = pct >= PASS_MARK * 100

  return (
    <div className="results">
      <div className={`score-circle ${passed ? 'grade-pass' : 'grade-fail'}`}>
        <span className="score-num">{score}</span>
        <span className="score-denom">/{total}</span>
      </div>

      <h2>{passed ? 'Well Done — You Passed!' : 'Keep Studying — Not Quite There Yet'}</h2>
      <p className="grade-msg">
        You scored {score} out of {total} ({pct}%). Pass mark is 75% ({Math.ceil(total * PASS_MARK)}/{total}).
      </p>

      <h3 className="summary-heading">Quiz Summary</h3>

      <div className="summary-list">
        {questions.map((q, i) => {
          const correct = userAnswers[i] === q.answer
          return (
            <div key={i} className={`summary-item ${correct ? 'summary-correct' : 'summary-wrong'}`}>
              <div className="summary-header">
                <span className="summary-num">Q{i + 1}</span>
                <span className="summary-topic">{q.topic}</span>
                <span className={`summary-tag ${correct ? 'tag-correct' : 'tag-wrong'}`}>
                  {correct ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <p className="summary-question">{q.text}</p>
              <div className="summary-answers">
                <div className="summary-answer your-answer">
                  <span className="answer-label">Your answer:</span>
                  <span className={correct ? 'answer-correct' : 'answer-wrong'}>
                    {LETTERS[userAnswers[i]]}. {q.options[userAnswers[i]]}
                  </span>
                </div>
                {!correct && (
                  <div className="summary-answer correct-answer">
                    <span className="answer-label">Correct answer:</span>
                    <span className="answer-correct">
                      {LETTERS[q.answer]}. {q.options[q.answer]}
                    </span>
                  </div>
                )}
              </div>
              <p className="summary-explanation">{q.explanation}</p>
            </div>
          )
        })}
      </div>

      <button className="btn-restart" onClick={onRestart}>
        Retake Quiz
      </button>
    </div>
  )
}
