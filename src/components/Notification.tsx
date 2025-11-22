import React, { useEffect } from "react";
import GlassCard from "./GlassCard";

type NotificationType = "success" | "error" | "info";

type NotificationProps = {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  const getColorClass = () => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in-down">
      <GlassCard className="flex items-center gap-3 px-6 py-4 min-w-[300px] shadow-2xl border-white/20">
        <span className={`material-symbols-outlined ${getColorClass()}`}>
          {getIcon()}
        </span>
        <p className="text-white font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </GlassCard>
    </div>
  );
};

export default Notification;
