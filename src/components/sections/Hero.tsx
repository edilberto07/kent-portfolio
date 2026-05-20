"use client";

import { CyberButton } from "@/components/ui/CyberButton";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const FULL_NAME = "Kent.";
const NAME_CHAR_MS = 80;

const ROLES = [
  "Full-Stack Developer",
  "Mobile Developer",
  "Problem Solver",
  "BISU Graduate",
] as const;

const ROLE_TYPE_MS = 60;
const ROLE_HOLD_MS = 1800;
const ROLE_ERASE_MS = 35;

type RolePhase = "typing" | "holding" | "erasing";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function useNameTyper(enabled: boolean) {
  const [displayedName, setDisplayedName] = useState(enabled ? "" : FULL_NAME);

  useEffect(() => {
    if (!enabled) {
      setDisplayedName(FULL_NAME);
      return;
    }

    if (displayedName.length >= FULL_NAME.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setDisplayedName(FULL_NAME.slice(0, displayedName.length + 1));
    }, NAME_CHAR_MS);

    return () => window.clearTimeout(timeout);
  }, [displayedName, enabled]);

  return displayedName;
}

function useRoleTyper(enabled: boolean) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(enabled ? 0 : ROLES[0].length);
  const [phase, setPhase] = useState<RolePhase>(enabled ? "typing" : "holding");

  const currentRole = ROLES[roleIndex];
  const displayedRole = enabled
    ? currentRole.slice(0, charIndex)
    : ROLES[0];

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (phase === "typing") {
      if (charIndex < currentRole.length) {
        const timeout = window.setTimeout(
          () => setCharIndex((value) => value + 1),
          ROLE_TYPE_MS,
        );
        return () => window.clearTimeout(timeout);
      }

      setPhase("holding");
      return;
    }

    if (phase === "holding") {
      const timeout = window.setTimeout(() => setPhase("erasing"), ROLE_HOLD_MS);
      return () => window.clearTimeout(timeout);
    }

    if (charIndex > 0) {
      const timeout = window.setTimeout(
        () => setCharIndex((value) => value - 1),
        ROLE_ERASE_MS,
      );
      return () => window.clearTimeout(timeout);
    }

    setRoleIndex((value) => (value + 1) % ROLES.length);
    setPhase("typing");
  }, [phase, charIndex, currentRole, enabled]);

  return displayedRole;
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const animationsEnabled = !shouldReduceMotion;

  const displayedName = useNameTyper(animationsEnabled);
  const displayedRole = useRoleTyper(animationsEnabled);

  return (
    <section
      id="hero"
      className="hero-atmosphere relative flex min-h-[100dvh] items-center"
      aria-label="Introduction"
    >
      <div className="hero-grid" aria-hidden />
      <div className="hero-scanlines" aria-hidden />

      <div
        className="hero-orb hero-orb--cyan -left-24 top-1/4"
        aria-hidden
      />
      <div
        className="hero-orb hero-orb--purple right-0 top-1/3"
        aria-hidden
      />
      <div
        className="hero-orb hero-orb--green bottom-1/4 left-1/3"
        aria-hidden
      />

      <motion.div
        className="section-shell relative z-10 w-full py-28 md:py-32"
        variants={animationsEnabled ? heroContainerVariants : undefined}
        initial={animationsEnabled ? "hidden" : false}
        animate={animationsEnabled ? "visible" : false}
      >
        <motion.div
          className="mb-8 flex items-center gap-3"
          variants={animationsEnabled ? heroItemVariants : undefined}
        >
          <span
            className={cn("status-dot", animationsEnabled && "status-dot--pulse")}
            aria-hidden
          />
          <p className="font-mono text-xs tracking-[0.14em] text-text-muted md:text-sm">
            System online — available for projects
          </p>
        </motion.div>

        <motion.p
          className="mb-4 font-mono text-sm text-accent-cyan/90 md:text-base"
          variants={animationsEnabled ? heroItemVariants : undefined}
        >
          {"> initializing portfolio.exe"}
        </motion.p>

        <motion.h1
          className="font-heading text-5xl font-black uppercase leading-none tracking-tight text-glow-cyan sm:text-6xl md:text-7xl lg:text-8xl"
          variants={animationsEnabled ? heroItemVariants : undefined}
        >
          {displayedName}
          {animationsEnabled && displayedName.length < FULL_NAME.length && (
            <span className="text-accent-cyan/60" aria-hidden>
              |
            </span>
          )}
        </motion.h1>

        <motion.p
          className="mt-4 min-h-[2rem] font-body text-lg text-text-muted md:text-xl lg:text-2xl"
          variants={animationsEnabled ? heroItemVariants : undefined}
        >
          <span className="text-accent-purple/80" aria-hidden>
            {"// "}
          </span>
          {displayedRole}
          {animationsEnabled && (
            <span className="text-accent-cyan/70" aria-hidden>
              |
            </span>
          )}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          variants={animationsEnabled ? heroItemVariants : undefined}
        >
          <CyberButton variant="cyan" href="#projects">
            [ View Projects ]
          </CyberButton>
          {/* TODO: Add resume.pdf to /public */}
          <CyberButton variant="purple" href="/resume.pdf" download>
            [ Download CV ]
          </CyberButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
