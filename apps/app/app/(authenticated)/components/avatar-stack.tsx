"use client"

import { useOthers, useSelf } from "@repo/collaboration/hooks"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/design-system/components/ui/tooltip"
import { tailwind } from "@repo/tailwind-config"

type PresenceAvatarProps = {
  info?: Liveblocks["UserMeta"]["info"]
}

const PresenceAvatar = ({ info }: PresenceAvatarProps) => (
  <Tooltip delayDuration={0}>
    <TooltipTrigger>
      <Avatar className="bg-secondary ring-background h-7 w-7 ring-1">
        <AvatarImage src={info?.avatar} alt={info?.name} />
        <AvatarFallback className="text-xs">
          {info?.name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent collisionPadding={4}>
      <p>{info?.name ?? "Unknown"}</p>
    </TooltipContent>
  </Tooltip>
)

export const AvatarStack = () => {
  const others = useOthers()
  const self = useSelf()
  const hasMoreUsers = others.length > 3

  return (
    <div className="flex items-center -space-x-1 px-4">
      {others.slice(0, 3).map(({ connectionId, info }) => (
        <PresenceAvatar key={connectionId} info={info} />
      ))}

      {hasMoreUsers && (
        <PresenceAvatar
          info={{
            name: `+${others.length - 3}`,
            color: tailwind.theme.colors.gray[500],
          }}
        />
      )}

      {self && <PresenceAvatar info={self.info} />}
    </div>
  )
}
