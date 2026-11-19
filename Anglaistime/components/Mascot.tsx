import React from 'react';

interface MascotProps {
  state: 'idle' | 'listening' | 'speaking';
  size?: 'sm' | 'md' | 'lg';
}

export const Mascot: React.FC<MascotProps> = ({ state, size = 'md' }) => {
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  // Simple SVG Robot/Creature Face
  return (
    <div className={`relative ${sizeClasses[size]} transition-all duration-300`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
        {/* Body/Head - Bumble is Yellow */}
        <circle cx="100" cy="100" r="90" fill="#FFD60A" stroke="#000" strokeWidth="4" />
        
        {/* Antennas */}
        <line x1="100" y1="10" x2="100" y2="40" stroke="#000" strokeWidth="4" />
        <circle cx="100" cy="10" r="10" fill="#F72585" className={state === 'speaking' ? 'animate-pulse' : ''} />

        {/* Eyes */}
        <g className={state === 'listening' ? 'animate-bounce' : ''}>
           {/* Left Eye */}
          <circle cx="70" cy="85" r="15" fill="white" stroke="#000" strokeWidth="3" />
          <circle cx="70" cy="85" r="5" fill="black" />
           {/* Right Eye */}
          <circle cx="130" cy="85" r="15" fill="white" stroke="#000" strokeWidth="3" />
          <circle cx="130" cy="85" r="5" fill="black" />
        </g>

        {/* Mouth */}
        {state === 'speaking' ? (
          <ellipse cx="100" cy="130" rx="20" ry="15" fill="#4CC9F0" stroke="#000" strokeWidth="3" className="animate-pulse" />
        ) : state === 'listening' ? (
           <path d="M 80 130 Q 100 150 120 130" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        ) : (
          <path d="M 70 130 Q 100 160 130 130" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        )}

        {/* Cheeks */}
        <circle cx="50" cy="110" r="10" fill="#F72585" opacity="0.4" />
        <circle cx="150" cy="110" r="10" fill="#F72585" opacity="0.4" />
      </svg>
      
      {/* Status Badge */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border-2 border-black font-bold text-sm whitespace-nowrap">
        {state === 'speaking' ? 'Bumble is talking...' : state === 'listening' ? 'Listening...' : 'Bumble'}
      </div>
    </div>
  );
};