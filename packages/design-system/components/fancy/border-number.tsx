import React, { forwardRef } from "react"
import { cn } from "@undrstnd/design-system/lib/utils"

interface BorderTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

export const BorderText = forwardRef<HTMLDivElement, BorderTextProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center">
        <span
          ref={ref}
          style={{ "--text": `'${text}'` } as React.CSSProperties}
          className={cn(
            `pointer-events-none relative text-center font-mono text-[6rem] font-bold leading-none before:bg-gradient-to-b before:from-neutral-300 before:to-neutral-200/70 before:to-80% before:bg-clip-text before:text-transparent before:content-[var(--text)] after:absolute after:inset-0 after:bg-neutral-400/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-[var(--text)] after:[text-shadow:0_1px_0_white] dark:before:from-neutral-700/70 dark:before:to-neutral-800/30 dark:after:bg-neutral-600/70 dark:after:mix-blend-lighten dark:after:[text-shadow:0_1px_0_black]`,
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

BorderText.displayName = "BorderText"
