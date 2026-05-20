import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type CyberButtonVariant = "cyan" | "purple";

const variantStyles: Record<CyberButtonVariant, string> = {
  cyan: [
    "border border-border-cyan",
    "bg-transparent text-accent-cyan",
    "hover:border-[rgba(0,255,255,0.45)]",
    "hover:bg-[rgba(0,255,255,0.05)]",
    "hover:shadow-[var(--glow-cyan)]",
  ].join(" "),
  purple: [
    "border border-border-purple",
    "bg-[rgba(168,85,247,0.12)] text-text-primary",
    "hover:border-[rgba(168,85,247,0.45)]",
    "hover:bg-[rgba(168,85,247,0.2)]",
    "hover:shadow-[var(--glow-purple)]",
  ].join(" "),
};

const baseStyles = [
  "clip-cyber",
  "inline-flex items-center justify-center",
  "font-mono text-sm tracking-[0.12em] uppercase",
  "px-6 py-3",
  "transition-[border-color,background-color,box-shadow,transform] duration-250 ease-out",
  "hover:-translate-y-0.5",
  "active:translate-y-0",
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

type CyberButtonBaseProps = {
  variant?: CyberButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type CyberButtonLinkProps = CyberButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
  };

type CyberButtonButtonProps = CyberButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: never;
  };

export type CyberButtonProps = CyberButtonLinkProps | CyberButtonButtonProps;

function buttonClasses(variant: CyberButtonVariant, className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}

export function CyberButton({
  variant = "cyan",
  className,
  children,
  href,
  ...props
}: CyberButtonProps) {
  const classes = buttonClasses(variant, className);

  if (href) {
    const { target, rel, download, ...anchorProps } =
      props as ComponentPropsWithoutRef<"a">;

    const isHash = href.startsWith("#");
    const isInternal =
      isHash || (href.startsWith("/") && !href.endsWith(".pdf"));

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        download={download}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } =
    props as ComponentPropsWithoutRef<"button">;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
