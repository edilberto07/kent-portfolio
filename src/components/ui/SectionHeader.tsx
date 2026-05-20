import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  /** Section index (1–99), rendered as "// 01" */
  index: number;
  /** Section title, e.g. "ABOUT", "SKILLS" */
  title: string;
  className?: string;
};

export function SectionHeader({ index, title, className }: SectionHeaderProps) {
  const sectionNumber = String(index).padStart(2, "0");

  return (
    <header className={cn("mb-10 w-full md:mb-14", className)}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3">
        <p className="font-mono text-sm tracking-[0.2em] text-accent-cyan/80">
          <span aria-hidden>{"// "}</span>
          <span className="sr-only">Section {sectionNumber}: </span>
          {sectionNumber}
        </p>

        <h2 className="font-heading shrink-0 text-2xl font-bold uppercase tracking-[0.14em] text-text-primary md:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div
          className="section-divider min-w-[4rem] flex-1 self-center"
          aria-hidden
        />
      </div>
    </header>
  );
}
