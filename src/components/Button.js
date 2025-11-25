export default function Button({ children, variant = "primary", className = "", ...props }) {
    return (
        <>
            <button className={`btn btn-${variant} ${className}`} {...props}>
                {children}
            </button>
            <style jsx>{`
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem 1.375rem;
                    border-radius: 980px;
                    font-weight: 400;
                    font-size: 1.0625rem;
                    line-height: 1.1764805882;
                    letter-spacing: -0.022em;
                    cursor: pointer;
                    transition: all 0.3s var(--ease-out);
                    border: none;
                    white-space: nowrap;
                }
                .btn-primary {
                    background-color: var(--accent-color);
                    color: white;
                }
                .btn-primary:hover {
                    background-color: var(--accent-hover);
                }
                .btn-secondary {
                    background-color: transparent;
                    color: var(--accent-color);
                    border: 1px solid var(--accent-color);
                }
                .btn-secondary:hover {
                    background-color: var(--accent-color);
                    color: white;
                }
            `}</style>
        </>
    );
}
