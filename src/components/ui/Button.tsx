import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-heading tracking-wider uppercase",
    {
        variants: {
            variant: {
                default: "bg-gradient-brand text-white hover:opacity-90 glow-violet border-none",
                destructive:
                    "bg-accent-red text-white hover:bg-accent-red/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-border hover:border-accent-violet text-text-secondary hover:text-text-primary",
                secondary:
                    "bg-surface-raised text-text-primary hover:bg-surface-overlay",
                ghost: "hover:bg-accent hover:text-accent-foreground hover:bg-surface-raised",
                link: "text-primary underline-offset-4 hover:underline",
                cyber: "bg-void border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-void glow-cyan transition-all duration-300",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
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
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
