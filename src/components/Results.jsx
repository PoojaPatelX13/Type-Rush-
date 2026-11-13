
function Results({ wpm, accuracy, characters }) {
    return (
        <div className="result">
            <h2>🎉 Test Completed!</h2>
            <p>Your Typing Speed: {wpm} WPM</p>
            <p>Your Accuracy: {accuracy}%</p>
            <p>Characters Typed: {characters}</p>
            <h3>Great Job! Keep Practicing 🚀</h3>
        </div>
    );
}

export default Results;
