"use client";

import { projects } from "@/data/projects";
import {
  ProjectCard,
  projectsContainerVariants,
} from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, useReducedMotion } from "framer-motion";

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  const sectionMotionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: sectionReveal,
      };

  const gridClassName =
    "grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8";

  return (
    <section id="projects" className="section-pad" aria-label="Projects">
      <motion.div className="section-shell" {...sectionMotionProps}>
        <SectionHeader index={3} title="PROJECTS" />

        <p className="mb-10 font-mono text-xs tracking-[0.16em] text-text-muted md:text-sm">
          {/* TODO: Add project screenshots to /public/images (see data/projects.ts) */}
          {`// ${projects.length} deployments loaded — select module to inspect`}
        </p>

        {shouldReduceMotion ? (
          <div className={gridClassName}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <motion.div
            className={gridClassName}
            variants={projectsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
