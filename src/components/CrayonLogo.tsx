export const CrayonLogo = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Honeycomb pattern of colored circles */}
      {/* Top row */}
      <circle cx="16" cy="6" r="4" fill="hsl(0 100% 63%)" />
      
      {/* Middle row */}
      <circle cx="9" cy="13" r="4" fill="hsl(24 100% 60%)" />
      <circle cx="16" cy="13" r="4" fill="hsl(48 100% 62%)" />
      <circle cx="23" cy="13" r="4" fill="hsl(145 45% 60%)" />
      
      {/* Bottom row */}
      <circle cx="12.5" cy="20" r="4" fill="hsl(214 100% 65%)" />
      <circle cx="19.5" cy="20" r="4" fill="hsl(248 79% 68%)" />
      
      {/* Bottom center */}
      <circle cx="16" cy="26" r="4" fill="hsl(270 68% 73%)" />
    </svg>
  );
};
