
function Stats({ wpm, accuracy }) {
    return (
        <>
            <div className="stat-box">
                <h2>{wpm}</h2>
                <p>WPM</p>
            </div>

            <div className="stat-box">
                <h2>{accuracy}%</h2>
                <p>Accuracy</p>
            </div>
        </>
    );
}

export default Stats;
