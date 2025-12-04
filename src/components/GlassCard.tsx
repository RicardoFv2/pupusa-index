import React from "react";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
};

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  noHover = false,
}) => {
  const baseClasses = "glass-card rounded-xl p-6";
  const hoverClasses = noHover
    ? ""
    : "transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
