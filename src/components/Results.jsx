import './Results.css'

const PASS_MARK = 0.75

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

      <table className="breakdown-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => {
            const correct = userAnswers[i] === q.answer
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{q.topic}</td>
                <td className={correct ? 'tag-correct' : 'tag-wrong'}>
                  {correct ? 'Correct' : 'Incorrect'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <button className="btn-restart" onClick={onRestart}>
        Retake Quiz
      </button>
    </div>
  )
}
