"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    abbrev: "GH",
    href: "https://github.com/yourusername", // TODO: Replace with your GitHub URL
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    abbrev: "LI",
    href: "https://linkedin.com/in/yourprofile", // TODO: Replace with your LinkedIn URL
  },
  {
    id: "facebook",
    label: "Facebook",
    abbrev: "FB",
    href: "https://facebook.com/yourprofile", // TODO: Replace with your Facebook URL
  },
] as const;

const socialButtonClassName = [
  "flex h-10 w-10 items-center justify-center",
  "border border-border-cyan bg-transparent",
  "font-mono text-xs font-bold tracking-wider text-accent-cyan",
  "transition-[border-color,background-color,color,box-shadow] duration-250",
  "hover:border-[rgba(0,255,255,0.35)]",
  "hover:bg-[rgba(0,255,255,0.03)]",
  "hover:text-text-primary hover:shadow-[var(--glow-cyan)]",
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
].join(" ");

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className={cn(socialButtonClassName, "pointer-events-none opacity-40")}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      className={socialButtonClassName}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border-cyan/60 bg-bg-base">
      <div className="section-shell py-10 md:py-12">
        <div className="section-divider mb-8" aria-hidden />

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.12em] text-text-muted sm:text-xs">
            © 2025 KENT EDILBERT T. TASIC — Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan/80 transition-colors hover:text-accent-cyan"
            >
              Next.js
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Social links">
              <ul className="flex gap-3" role="list">
                {socialLinks.map((link) => (
                  <li key={link.id} role="listitem">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={socialButtonClassName}
                      aria-label={link.label}
                    >
                      {link.abbrev}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
