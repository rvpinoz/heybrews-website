export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary bg-canvas rounded-full px-3 py-1.5 border border-hairline">
      <span className="w-[7px] h-[7px] rounded-full bg-current" />
      {children}
    </span>
  );
}
