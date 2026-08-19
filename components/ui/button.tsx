import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-body font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-white hover:bg-brand-primary/90",
        accent:
          "bg-accent-cta text-white hover:bg-accent-cta/90",
        destructive:
          "bg-error text-white hover:bg-error/90",
        outline:
          "border border-border-subtle bg-transparent shadow-sm hover:bg-neutral-card-bg hover:text-ink",
        secondary:
          "bg-brand-light text-brand-primary hover:bg-brand-light/80",
        ghost: "shadow-none hover:bg-neutral-card-bg hover:text-ink hover:translate-y-0",
        link: "text-brand-primary underline-offset-4 hover:underline shadow-none hover:translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-caption",
        lg: "h-14 px-8 text-body-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
