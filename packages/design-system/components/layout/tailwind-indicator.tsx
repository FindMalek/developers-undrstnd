export function TailwindIndicator() {
  // Don't show in production
  if (process.env.NODE_ENV === "production") {
    return null
  }
  return (
    <div className="absolute bottom-12 right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-800 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
