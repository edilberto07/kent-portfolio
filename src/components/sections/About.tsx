"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const aboutDetails = [
  {
    label: "NAME",
    value: "Kent Edilbert T. Tasic",
  },
  {
    label: "SCHOOL",
    value: "Bohol Island State University (BISU)",
  },
  {
    label: "LOCATION",
    value: "Bohol, Philippines", // TODO: Update with your city/region
  },
  {
    label: "DOMAINS",
    value: "Full-Stack · Mobile · Web Systems",
  },
  {
    label: "STATUS",
    value: "Available for work",
    highlight: true,
  },
] as const;

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid gap-1 border-b border-border-cyan py-4 last:border-b-0">
      <span className="font-mono text-[10px] tracking-[0.22em] text-text-muted">
        {label}
      </span>
      <span
        className={cn(
          "font-body text-sm leading-relaxed md:text-base",
          highlight ? "text-accent-cyan" : "text-text-primary",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default function About() {
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
    <section id="about" className="section-pad" aria-label="About">
      <motion.div className="section-shell" {...motionProps}>
        <SectionHeader index={1} title="ABOUT" />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            {/* TODO: Add profile photo — optional clipped image beside or above bio */}
            <p className="font-body text-base leading-relaxed text-text-muted md:text-lg">
              I&apos;m a developer focused on building reliable web and mobile
              experiences — from Laravel and Next.js backends to Flutter and
              React Native apps. I enjoy turning complex problems into clean,
              maintainable systems that people actually want to use.
            </p>
            <p className="font-body text-base leading-relaxed text-text-muted md:text-lg">
              {/* TODO: Personalize this bio with your story, interests, and goals */}
              Currently exploring AI-assisted workflows, sharpening my craft in
              TypeScript ecosystems, and shipping projects that blend software
              engineering with real-world impact — including hardware tinkering
              with Arduino and game development in Godot.
            </p>
          </div>

          <aside
            className="cyber-card p-6 md:p-8"
            aria-label="Profile information"
          >
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent-cyan/80">
              {"// user.profile"}
            </p>
            <dl className="space-y-0">
              {aboutDetails.map((row) => (
                <div key={row.label}>
                  <InfoRow
                    label={row.label}
                    value={row.value}
                    highlight={"highlight" in row && row.highlight}
                  />
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
