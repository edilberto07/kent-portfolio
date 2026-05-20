"use client";

import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillBarFromSkill } from "@/components/ui/SkillBar";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const STAGGER_S = 0.08;

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const categoryAccent: Record<string, string> = {
  Languages: "text-accent-cyan",
  "Frameworks & Technologies": "text-accent-purple",
  "Game & Hardware": "text-accent-green",
};

function getCategoryBarOffset(categoryIndex: number) {
  return skillCategories
    .slice(0, categoryIndex)
    .reduce((total, category) => total + category.skills.length, 0);
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: sectionReveal,
      };

  return (
    <section id="skills" className="section-pad" aria-label="Skills">
      <motion.div className="section-shell" {...motionProps}>
        <SectionHeader index={2} title="SKILLS" />

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="min-w-0">
              <h3
                className={cn(
                  "mb-6 font-mono text-xs tracking-[0.18em] uppercase md:text-sm",
                  categoryAccent[category.title] ?? "text-text-muted",
                )}
              >
                <span className="text-text-muted/70" aria-hidden>
                  {"// "}
                </span>
                {category.title}
              </h3>

              <ul className="space-y-5" role="list">
                {category.skills.map((skill, skillIndex) => {
                  const barDelay =
                    (getCategoryBarOffset(categoryIndex) + skillIndex) *
                    STAGGER_S;

                  return (
                    <li key={skill.name} role="listitem">
                      <SkillBarFromSkill skill={skill} delay={barDelay} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
