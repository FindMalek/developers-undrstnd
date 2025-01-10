import type { ComponentProps } from "react"
import type { Message as MessageType } from "ai"
import Markdown from "react-markdown"
import { twMerge } from "tailwind-merge"

type MessageProps = {
  data: MessageType
  markdown?: ComponentProps<typeof Markdown>
}

export const Message = ({ data, markdown }: MessageProps) => (
  <div
    className={twMerge(
      "flex max-w-[80%] flex-col gap-2 rounded-xl px-4 py-2",
      data.role === "user"
        ? "bg-foreground text-background self-end"
        : "bg-muted self-start"
    )}
  >
    <Markdown {...markdown}>{data.content}</Markdown>
  </div>
)
