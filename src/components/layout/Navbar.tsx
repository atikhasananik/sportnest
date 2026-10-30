"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "@/components/ui/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/all-sports", label: "All Sports" },
  { href: "/add-sports", label: "Add Sports" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-base/80 backdrop-blur-xl">
      <nav
        className="shell flex h-18 items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-[#08090c] shadow-[0_0_24px_rgba(195,242,47,0.35)] transition-transform duration-300 group-hover:-rotate-6">
            <Zap className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Sport<span className="text-brand-400">Nest</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-400"
                      : "text-muted hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-brand-400" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link href="/all-sports" className="btn-primary px-5 py-2.5">
            Book a court
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-white/8 bg-base md:hidden">
          <ul className="shell flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-500/10 text-brand-400"
                        : "text-muted hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/all-sports"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Book a court
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
