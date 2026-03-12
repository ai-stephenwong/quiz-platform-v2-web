import './StartScreen.css'

export default function StartScreen({ onStart, loading }) {
  return (
    <div className="start-screen">
      <h2>Ready to test your knowledge?</h2>
      <p>
        This quiz covers key concepts from the{' '}
        <strong>ISTQB Certified Tester Foundation Level (CTFL) v4.0</strong>{' '}
        syllabus. Answer all 20 multiple-choice questions and see how well you
        understand software testing fundamentals.
      </p>

      <div className="info-grid">
        <div className="info-box">
          <div className="val">20</div>
          <div className="lbl">Questions</div>
        </div>
        <div className="info-box">
          <div className="val">75%</div>
          <div className="lbl">Pass Mark</div>
        </div>
        <div className="info-box">
          <div className="val">CTFL</div>
          <div className="lbl">v4.0 Syllabus</div>
        </div>
      </div>

      <button className="btn-start" onClick={onStart} disabled={loading}>
        {loading ? 'Loading…' : 'Start Quiz'}
      </button>
    </div>
  )
}
