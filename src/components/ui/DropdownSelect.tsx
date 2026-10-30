"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "@/components/ui/icons";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownVariant = "field" | "pill";

type DropdownSelectProps = {
  id: string;
  /** Form field name — renders a hidden input so FormData still sees the value. */
  name?: string;
  /** Accessible name for the listbox. */
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Rendered muted to the left of the current value (e.g. "Sort"). */
  prefix?: string;
  /** `field` matches text inputs, `pill` matches the toolbar controls. */
  variant?: DropdownVariant;
  invalid?: boolean;
  /** Extra classes for the dropdown panel. */
  panelClassName?: string;
};

export default function DropdownSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Choose an option",
  prefix,
  variant = "field",
  invalid = false,
  panelClassName = "",
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((option) => option.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;

    document
      .getElementById(`${id}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, id]);

  function openList() {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function select(index: number) {
    const option = options[index];
    if (!option) return;

    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        openList();
        return;
      }

      setActiveIndex((current) => {
        const start = current < 0 ? 0 : current;
        return event.key === "ArrowDown"
          ? Math.min(start + 1, options.length - 1)
          : Math.max(start - 1, 0);
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!open) {
        openList();
        return;
      }

      if (activeIndex >= 0) select(activeIndex);
      return;
    }

    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }
  }

  const triggerClass =
    variant === "pill"
      ? `flex items-center gap-2 rounded-full border px-4 py-3 text-sm transition-colors focus:outline-none ${
          invalid
            ? "border-red-400/60 bg-red-500/5"
            : "border-white/10 bg-white/5 hover:border-white/20 focus:border-brand-400/60"
        } ${open ? "border-brand-400/60 bg-white/[0.07]" : ""}`
      : `flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus:outline-none ${
          invalid
            ? "border-red-400/60 bg-red-500/5"
            : "border-white/10 bg-white/5 focus:border-brand-400/60"
        } ${open ? "border-brand-400/60 bg-white/[0.07]" : ""}`;

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
        }
        className={triggerClass}
      >
        {prefix ? (
          <span
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${
              selected ? "text-muted" : "text-muted/70"
            }`}
          >
            {prefix}
          </span>
        ) : null}
        <span className={selected ? "text-ink" : "text-muted/70"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={label}
          className={`absolute top-full z-50 mt-2 overflow-y-auto rounded-xl border border-white/10 bg-surface-2 p-1.5 shadow-2xl shadow-black/60 ${
            variant === "pill"
              ? "right-0 min-w-[14rem] max-h-72"
              : "inset-x-0 max-h-[21rem]"
          } ${panelClassName}`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(index)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isSelected ? "text-brand-400" : "text-ink"
                  } ${isActive ? "bg-white/8" : "hover:bg-white/5"}`}
                >
                  {option.label}
                  {isSelected ? <Check className="size-4" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
