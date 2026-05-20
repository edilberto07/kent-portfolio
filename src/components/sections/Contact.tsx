"use client";

import { CyberButton } from "@/components/ui/CyberButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const contactChannels = [
  {
    id: "email",
    label: "EMAIL",
    value: "your.email@example.com", // TODO: Replace with your email
    href: "mailto:your.email@example.com", // TODO: Replace with your email
    icon: <Mail className="h-4 w-4" aria-hidden />,
  },
  {
    id: "github",
    label: "GITHUB",
    value: "github.com/yourusername", // TODO: Replace with your GitHub username
    href: "https://github.com/yourusername", // TODO: Replace with your GitHub URL
    icon: (
      <span className="font-mono text-xs font-bold tracking-wider" aria-hidden>
        GH
      </span>
    ),
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/yourprofile", // TODO: Replace with your LinkedIn handle
    href: "https://linkedin.com/in/yourprofile", // TODO: Replace with your LinkedIn URL
    icon: (
      <span className="font-mono text-xs font-bold tracking-wider" aria-hidden>
        LI
      </span>
    ),
  },
] as const;

const inputClassName =
  "cyber-input w-full px-4 py-3 font-body text-sm text-text-primary md:text-base";

type ContactInfoCardProps = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
};

function ContactInfoCard({ label, value, href, icon }: ContactInfoCardProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className="cyber-card group flex gap-4 p-5 transition-transform md:p-6"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border-cyan text-accent-cyan transition-colors group-hover:border-[rgba(0,255,255,0.35)] group-hover:text-text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] tracking-[0.22em] text-text-muted">
          {label}
        </span>
        <span className="mt-1 block truncate font-body text-sm text-accent-cyan transition-colors group-hover:text-text-primary md:text-base">
          {value}
        </span>
      </span>
    </a>
  );
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: sectionReveal,
      };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Wire to Formspree, Resend, or your API route
    setStatus("sent");
  };

  return (
    <section id="contact" className="section-pad" aria-label="Contact">
      <motion.div className="section-shell" {...motionProps}>
        <SectionHeader index={4} title="CONTACT" />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="font-mono text-xs tracking-[0.16em] text-accent-cyan/80">
              {"// transmit.message"}
            </p>

            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="font-mono text-[10px] tracking-[0.2em] text-text-muted"
              >
                NAME
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="font-mono text-[10px] tracking-[0.2em] text-text-muted"
              >
                EMAIL
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="font-mono text-[10px] tracking-[0.2em] text-text-muted"
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project..."
                className={cn(inputClassName, "resize-y min-h-[140px]")}
              />
            </div>

            <CyberButton type="submit" variant="cyan" className="w-full sm:w-auto">
              [ Send Message ]
            </CyberButton>

            {status === "sent" && (
              <p className="font-mono text-xs text-accent-green" role="status">
                {"// transmission queued — connect backend to deliver"}
              </p>
            )}
          </form>

          <aside className="space-y-4" aria-label="Contact channels">
            <p className="mb-2 font-mono text-xs tracking-[0.16em] text-text-muted">
              {"// open.channels"}
            </p>
            {contactChannels.map((channel) => (
              <ContactInfoCard
                key={channel.id}
                label={channel.label}
                value={channel.value}
                href={channel.href}
                icon={channel.icon}
              />
            ))}
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
