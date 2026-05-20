"use client";

import type { Skill, SkillBarColor } from "@/data/skills";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const fillClassMap: Record<SkillBarColor, string> = {
  cyan: "skill-bar-fill--cyan",
  purple: "skill-bar-fill--purple",
  green: "skill-bar-fill--green",
};

export type SkillBarProps = {
  name: string;
  level: number;
  color: SkillBarColor;
  /** Stagger delay in seconds (e.g. index * 0.08) */
  delay?: number;
  className?: string;
};

export function SkillBar({
  name,
  level,
  color,
  delay = 0,
  className,
}: SkillBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const targetWidth = `${level}%`;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="font-body text-sm text-text-primary">{name}</span>
        <span className="font-mono text-xs tracking-wider text-text-muted">
          {level}%
        </span>
      </div>

      <div
        className="skill-bar-track"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className={cn("h-full", fillClassMap[color])}
          initial={{ width: shouldReduceMotion ? targetWidth : "0%" }}
          whileInView={{ width: targetWidth }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.2,
            ease: "easeOut",
            delay: shouldReduceMotion ? 0 : delay,
          }}
        />
      </div>
    </div>
  );
}

/** Convenience wrapper when passing a `Skill` from data/skills.ts */
export function SkillBarFromSkill({
  skill,
  delay,
  className,
}: {
  skill: Skill;
  delay?: number;
  className?: string;
}) {
  return (
    <SkillBar
      name={skill.name}
      level={skill.level}
      color={skill.color}
      delay={delay}
      className={className}
    />
  );
}
