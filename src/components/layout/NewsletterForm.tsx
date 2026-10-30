"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();

    if (!value) {
      toast({
        variant: "danger",
        title: "Enter a valid email address",
        description: "We need somewhere to send the good stuff.",
      });
      return;
    }

    toast({
      variant: "success",
      title: "You're on the list",
      description: "New venues and weekend slots, straight to your inbox.",
    });
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 focus-within:border-brand-400/50"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onInvalid={(event) => {
          event.preventDefault();
          toast({
            variant: "danger",
            title: "That email doesn't look right",
            description: "Try something like you@example.com.",
          });
          event.currentTarget.focus();
        }}
        placeholder="you@example.com"
        className="w-full bg-transparent px-3 py-1.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-500 text-base transition-colors hover:bg-brand-400"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
