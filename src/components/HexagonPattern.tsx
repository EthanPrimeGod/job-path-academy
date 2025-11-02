interface HexagonPatternProps {
  opacity?: number;
}

export const HexagonPattern = ({ opacity = 0.03 }: HexagonPatternProps) => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagon-pattern"
            x="0"
            y="0"
            width="100"
            height="87"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon-pattern)" className="text-foreground" />
      </svg>
      {/* Gradient fade at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
};
