"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "@/components/ui/icons";

export type ToastVariant = "success" | "danger" | "info";

export type ToastInput = {
  variant?: ToastVariant;
  title: string;
  description?: string;
  /** Auto-dismiss delay in ms. Defaults per variant. */
  duration?: number;
};

type ToastItem = {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOASTS = 3;

const DEFAULT_DURATION: Record<ToastVariant, number> = {
  success: 4000,
  info: 5000,
  danger: 6000,
};

const VARIANT_STYLES: Record<
  ToastVariant,
  { icon: typeof CheckCircle; iconClass: string; borderClass: string; barClass: string }
> = {
  success: {
    icon: CheckCircle,
    iconClass: "text-brand-400",
    borderClass: "border-brand-400/40",
    barClass: "bg-brand-500",
  },
  danger: {
    icon: AlertTriangle,
    iconClass: "text-red-300",
    borderClass: "border-red-400/40",
    barClass: "bg-red-400",
  },
  info: {
    icon: Info,
    iconClass: "text-brand-300",
    borderClass: "border-white/15",
    barClass: "bg-brand-300/60",
  },
};

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  const styles = VARIANT_STYLES[item.variant];
  const Icon = styles.icon;

  useEffect(() => {
    if (paused) return;

    const timer = window.setTimeout(() => onDismiss(item.id), item.duration);
    return () => window.clearTimeout(timer);
  }, [paused, item.id, item.duration, onDismiss]);

  return (
    <div
      role={item.variant === "danger" ? "alert" : "status"}
      aria-live={item.variant === "danger" ? "assertive" : "polite"}
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={`toast-enter pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border bg-surface-2 shadow-2xl shadow-black/60 ${styles.borderClass}`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`mt-0.5 size-5 shrink-0 ${styles.iconClass}`} />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-tight text-ink">
            {item.title}
          </p>
          {item.description ? (
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {item.description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onDismiss(item.id)}
          aria-label="Dismiss notification"
          className="-mr-1 -mt-1 grid size-6 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-ink"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <div aria-hidden="true" className={`h-0.5 w-full ${styles.barClass}`} />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const variant = input.variant ?? "info";
    const item: ToastItem = {
      id: ++nextId.current,
      variant,
      title: input.title,
      description: input.description,
      duration: input.duration ?? DEFAULT_DURATION[variant],
    };

    setToasts((current) => [item, ...current].slice(0, MAX_TOASTS));
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[150] flex flex-col items-center gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }

  return context;
}
