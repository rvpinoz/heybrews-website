import { cn } from '@/lib/utils';

const VARIANTS = {
  a: [
    { color: 'bg-sky/50', size: 'h-[180px] w-[180px]', pos: 'top-[8%] left-[5%]', anim: 'blob-float-1', dur: '9s' },
    { color: 'bg-primary/25', size: 'h-[210px] w-[210px]', pos: 'bottom-[10%] right-[8%]', anim: 'blob-float-2', dur: '10s' },
    { color: 'bg-purple/30', size: 'h-[140px] w-[140px]', pos: 'top-[40%] right-[20%]', anim: 'blob-float-3', dur: '8s' },
  ],
  b: [
    { color: 'bg-primary/20', size: 'h-[200px] w-[200px]', pos: 'top-[5%] right-[10%]', anim: 'blob-float-2', dur: '10s' },
    { color: 'bg-sky/40', size: 'h-[160px] w-[160px]', pos: 'bottom-[12%] left-[8%]', anim: 'blob-float-1', dur: '9s' },
    { color: 'bg-purple/25', size: 'h-[120px] w-[120px]', pos: 'top-[55%] left-[30%]', anim: 'blob-float-3', dur: '8s' },
  ],
} as const;

export function Blobs({
  variant = 'a',
  className,
}: {
  variant?: 'a' | 'b';
  className?: string;
}) {
  const blobs = VARIANTS[variant];

  return (
    <div
      className={cn(
        'absolute inset-0 -z-0 overflow-hidden pointer-events-none',
        className,
      )}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={cn(
            'blob absolute rounded-full',
            b.color,
            b.size,
            b.pos,
          )}
          style={{
            filter: 'blur(34px)',
            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
