import React from 'react';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
