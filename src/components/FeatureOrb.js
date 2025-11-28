export default function FeatureOrb({ variant = 'default' }) {
    return (
        <div className="orb-container">
            <svg width="80" height="80" viewBox="0 0 80 80" className="feature-orb">
                <defs>
                    <linearGradient id={`grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id={`glow-${variant}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {variant === 'grid' && (
                    <g className="math-viz">
                        <circle cx="40" cy="40" r="28" fill="none" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.6" />
                        <line x1="20" y1="40" x2="60" y2="40" stroke={`url(#grad-${variant})`} strokeWidth="1" opacity="0.6" />
                        <line x1="40" y1="20" x2="40" y2="60" stroke={`url(#grad-${variant})`} strokeWidth="1" opacity="0.6" />
                        <circle cx="40" cy="40" r="18" fill={`url(#grad-${variant})`} opacity="0.15" filter={`url(#glow-${variant})`} />
                        <circle cx="40" cy="40" r="4" fill={`url(#grad-${variant})`} className="pulse-dot" />
                    </g>
                )}

                {variant === 'wave' && (
                    <g className="math-viz">
                        <path d="M 10,40 Q 25,20 40,40 T 70,40" fill="none" stroke={`url(#grad-${variant})`} strokeWidth="2.5" opacity="0.7" />
                        <path d="M 10,40 Q 25,60 40,40 T 70,40" fill="none" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.4" />
                        <circle cx="40" cy="40" r="20" fill={`url(#grad-${variant})`} opacity="0.1" filter={`url(#glow-${variant})`} />
                    </g>
                )}

                {variant === 'nodes' && (
                    <g className="math-viz">
                        <circle cx="40" cy="25" r="5" fill={`url(#grad-${variant})`} opacity="0.8" />
                        <circle cx="25" cy="55" r="5" fill={`url(#grad-${variant})`} opacity="0.8" />
                        <circle cx="55" cy="55" r="5" fill={`url(#grad-${variant})`} opacity="0.8" />
                        <line x1="40" y1="25" x2="25" y2="55" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.5" />
                        <line x1="40" y1="25" x2="55" y2="55" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.5" />
                        <line x1="25" y1="55" x2="55" y2="55" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.5" />
                        <circle cx="40" cy="40" r="22" fill={`url(#grad-${variant})`} opacity="0.08" filter={`url(#glow-${variant})`} />
                    </g>
                )}

                {variant === 'concentric' && (
                    <g className="math-viz">
                        <circle cx="40" cy="40" r="28" fill="none" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.4" />
                        <circle cx="40" cy="40" r="20" fill="none" stroke={`url(#grad-${variant})`} strokeWidth="1.5" opacity="0.6" />
                        <circle cx="40" cy="40" r="12" fill={`url(#grad-${variant})`} opacity="0.3" filter={`url(#glow-${variant})`} />
                        <circle cx="40" cy="40" r="5" fill={`url(#grad-${variant})`} opacity="0.9" />
                    </g>
                )}
            </svg>

            <style jsx>{`
        .orb-container {
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        .feature-orb {
          filter: drop-shadow(0 0 10px rgba(0, 113, 227, 0.3));
        }
        .math-viz {
          animation: float 6s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(2deg);
          }
        }
        .pulse-dot {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
        </div>
    );
}
