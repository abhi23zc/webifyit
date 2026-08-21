"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

// ─── Context ────────────────────────────────────────────────────

const ToastContext = React.createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

// ─── Provider ───────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Toast Item ─────────────────────────────────────────────────

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 border rounded-xs shadow-3d font-body text-sm font-medium animate-slide-up ${styles[toast.type]}`}
    >
      {icons[toast.type]}
      <span className="flex-grow">{toast.message}</span>
      <button
        onClick={onDismiss}
        className="shrink-0 p-0.5 hover:opacity-70 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
