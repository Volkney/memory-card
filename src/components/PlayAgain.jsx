export default function PlayAgain({ onReset }) {
    return (
        <section>
            <button onClick={onReset}>
                Play Again!
            </button>
        </section>

    )
}