
function TypingArea({ input, handleTyping, disabled }) {
    return (
        <textarea
            value={input}
            onChange={handleTyping}
            placeholder="Start typing here..."
            disabled={disabled}
        />
    );
}

export default TypingArea;
