import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  color?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ color = 'dark' }) => {
  return (
    <div className="flex items-center">
      <Sparkles className={`w-7 h-7 ${color === 'light' ? 'text-white' : 'text-dark'}`} />
      <span className={`ml-2 text-2xl font-serif font-bold tracking-tight ${color === 'light' ? 'text-white' : 'text-dark'}`}>
        Polished
      </span>
    </div>
  );
};

export default Logo;