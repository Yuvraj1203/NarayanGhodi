import {
  CalendarHeart,
  Camera,
  Crown,
  Flag,
  Heart,
  KeyRound,
  MapPin,
  Map as MapIcon,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/** Simple line-art horse head, matching Lucide's 24px/1.5 stroke style. */
export function HorseIcon(props: LucideProps) {
  const { size = 24, strokeWidth = 1.5, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M8 21v-4.5c0-1.6-.9-3-2.2-3.8C4.6 12 4 10.7 4.4 9.4l.9-2.9c.4-1.4 1.3-2.6 2.6-3.3L9.5 2l.6 2.1 1.6-1.1.2 2.2c2.4.9 4.3 2.9 5 5.4l.8 2.7 1.6 1.9c.6.7.5 1.8-.2 2.4l-.5.4c-.6.5-1.5.5-2.1-.1L15 16.4" />
      <path d="M12 21v-3.5" />
      <circle cx="9.3" cy="7.3" r=".6" fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<string, LucideIcon | typeof HorseIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  flag: Flag,
  map: MapIcon,
  'map-pin': MapPin,
  key: KeyRound,
  calendar: CalendarHeart,
  camera: Camera,
  horse: HorseIcon,
  shield: ShieldCheck,
  heart: Heart,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = ICONS[name] ?? Sparkles;
  return <C {...props} />;
}
