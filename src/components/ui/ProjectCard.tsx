"use client";

import { badgeStyles, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const projectsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const badge = badgeStyles[project.badge];

  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden border-b border-border-cyan bg-[rgba(0,255,255,0.02)]">
        {!imageError ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="font-mono text-xs tracking-[0.2em] text-accent-cyan/60">
              {"// NO_SIGNAL"}
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              {/* TODO: Add screenshot to {project.image} */}
              {project.image}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-text-primary md:text-xl">
            {project.title}
          </h3>
          <span
            className={cn(
              "shrink-0 border px-2 py-0.5 font-mono text-[10px] tracking-[0.2em]",
              badge.className,
            )}
            style={{ color: badge.color, borderColor: `${badge.color}66` }}
          >
            {project.badge}
          </span>
        </div>

        <p className="font-mono text-xs tracking-wide text-text-muted md:text-sm">
          {project.stack}
        </p>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-2 font-mono text-xs">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan transition-colors hover:text-text-primary"
              >
                [ Live ]
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-purple transition-colors hover:text-text-primary"
              >
                [ Repo ]
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );

  const cardClassName = cn(
    "cyber-card group flex h-full flex-col overflow-hidden",
    className,
  );

  if (shouldReduceMotion) {
    return <article className={cardClassName}>{content}</article>;
  }

  return (
    <motion.article variants={projectCardVariants} className={cardClassName}>
      {content}
    </motion.article>
  );
}
