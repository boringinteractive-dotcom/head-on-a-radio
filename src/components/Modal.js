export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3 className="h3">{title}</h3>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.2s var(--ease-out);
        }
        .modal-content {
          background: var(--card-bg);
          backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow: auto;
          box-shadow: var(--shadow-xl);
          animation: slideUp 0.3s var(--ease-out);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .modal-body {
          padding: 1.5rem;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s var(--ease-out);
        }
        .close-btn:hover {
          background-color: var(--border-color);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}
