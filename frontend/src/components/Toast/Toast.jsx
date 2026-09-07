import "./Toast.css";

function Toast({ message, type = "success", onClose }) {

    if (!message) {
        return null;
    }

    return (
        <div className={`toast toast-${type}`}>

            <span className="toast-icon">

                {type === "success" && "✓"}
                {type === "error" && "✕"}
                {type === "warning" && "!"}

            </span>

            <span className="toast-message">
                {message}
            </span>

            <button
                className="toast-close"
                onClick={onClose}
            >
                ×
            </button>

        </div>
    );
}

export default Toast;